import { createClient } from "@/lib/supabaseClient";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase
    .from("payment_requests")
    .select("*");

  return Response.json(data);
}