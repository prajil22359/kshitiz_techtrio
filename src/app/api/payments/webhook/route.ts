import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createClient();

  const txnId =
    body?.data?.merchantTransactionId ||
    body?.data?.transactionId ||
    body?.merchantTransactionId;
  const status = body?.code === "PAYMENT_SUCCESS" ? "SUCCESS" : "FAILED";

  if (!txnId) {
    return Response.json({ ok: false, error: "Missing transaction id" }, { status: 400 });
  }

  await supabase
    .from("payment_requests")
    .update({
      status,
      paid_at: new Date().toISOString(),
    })
    .eq("transacation_id", txnId);

  return Response.json({ ok: true });
}