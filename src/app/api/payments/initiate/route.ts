import crypto from "crypto";
import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return Response.json({ error: "Missing payment request ID" }, { status: 400 });
    }

    const supabase = createClient();

    // get payment request
    const { data: payment, error: fetchError } = await supabase
      .from("payment_requests")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !payment) {
      return Response.json({ error: "Payment request not found" }, { status: 404 });
    }

    const txnId = `TXN_${Date.now()}`;

    const merchantId = process.env.PHONEPE_CLIENT_ID;
    const saltKey = process.env.PHONEPE_CLIENT_SECRET;
    const saltIndex = process.env.PHONEPE_SALT_INDEX || "1";

    if (!merchantId || !saltKey) {
      console.error("Missing PhonePe credentials");
      return Response.json({ error: "Payment gateway not configured" }, { status: 500 });
    }

    const amountInPaise = Math.round(Number(payment.amount) * 100);

    if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
      return Response.json({ error: "Invalid payment amount" }, { status: 400 });
    }

    const payload = {
      merchantId,
      merchantTransactionId: txnId,
      merchantUserId: payment.client_id || "CLIENT",
      amount: amountInPaise,
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/client/payments`,
      redirectMode: "REDIRECT",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payments/webhook`,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const base64 = Buffer.from(JSON.stringify(payload)).toString("base64");

    const checksumHash = crypto
      .createHash("sha256")
      .update(base64 + "/pg/v1/pay" + saltKey)
      .digest("hex");
    const checksum = `${checksumHash}###${saltIndex}`;

    const res = await fetch(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          "X-MERCHANT-ID": merchantId,
        },
        body: JSON.stringify({ request: base64 }),
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.success) {
      console.error("PhonePe error:", data);
      return Response.json(
        {
          error: data?.message || data?.code || "PhonePe request failed",
          phonepe: data,
        },
        { status: 500 }
      );
    }

    // store txn_id with current timestamp
    const { error: updateError } = await supabase
      .from("payment_requests")
      .update({ transacation_id: txnId })
      .eq("id", id);

    if (updateError) {
      console.error("Failed to update transaction ID:", updateError);
    }

    const redirectUrl = data?.data?.instrumentResponse?.redirectInfo?.url;

    if (!redirectUrl) {
      return Response.json({ error: "PhonePe redirect URL missing", phonepe: data }, { status: 500 });
    }

    return Response.json({
      url: redirectUrl,
      success: true,
    });
  } catch (err) {
    console.error("Payment initiation error:", err);
    return Response.json(
      { error: "Server error during payment initiation" },
      { status: 500 }
    );
  }
}