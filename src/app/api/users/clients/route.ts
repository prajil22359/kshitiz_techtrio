import { createClient } from "@/lib/supabaseClient";

export async function GET() {
  const supabase = createClient();

  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("role", "client");

  return Response.json(data);
}