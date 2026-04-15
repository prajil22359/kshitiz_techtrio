import { createClient } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createClient();

  const { amount, deadline, clientId } = body;

  if (!amount || !deadline || !clientId) {
    return Response.json({ error: "Missing amount, deadline, or clientId" }, { status: 400 });
  }

  const { data: client, error: clientError } = await supabase
    .from("users")
    .select("id, email, name")
    .eq("id", clientId)
    .single();

  if (clientError) {
    return Response.json({ error: clientError.message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("payment_requests")
    .insert([
      {
        client_id: clientId,
        request_title: body.requestTitle || `Payment Request - ${client?.name || client?.email || clientId}`,
        amount,
        deadline,
        status: "PENDING",
        created_at: new Date().toISOString(),
      },
    ])
    .select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true, data: data?.[0] ?? null });
}