import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@/lib/supabaseClient";

async function fetchPaymentsByColumn(
  admin: ReturnType<typeof createClient>,
  column: "client_id" | "user_id",
  userId: string
) {
  return admin
    .from("payment_requests")
    .select("*")
    .eq(column, userId)
    .order("created_at", { ascending: false });
}

export async function GET() {
  try {
    const cookieStore = await cookies();

    // Resolve currently logged-in user from auth cookies.
    const authClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll() {
            // No-op for read-only GET route.
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser();

    if (authError || !user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createClient();

    // Primary key mapping in this project is client_id, but keep fallback for legacy user_id data.
    const byClientId = await fetchPaymentsByColumn(admin, "client_id", user.id);

    if (byClientId.error && byClientId.error.code !== "42703") {
      console.error("Error fetching payments by client_id:", byClientId.error);
      return Response.json({ error: byClientId.error.message }, { status: 500 });
    }

    if (!byClientId.error && (byClientId.data?.length ?? 0) > 0) {
      return Response.json(byClientId.data);
    }

    const byUserId = await fetchPaymentsByColumn(admin, "user_id", user.id);

    if (byUserId.error) {
      if (byClientId.error && byClientId.error.code === "42703" && byUserId.error.code === "42703") {
        return Response.json({ error: "Neither client_id nor user_id exists on payment_requests" }, { status: 500 });
      }

      if (byUserId.error.code !== "42703") {
        console.error("Error fetching payments by user_id:", byUserId.error);
        return Response.json({ error: byUserId.error.message }, { status: 500 });
      }
    }

    return Response.json(byUserId.data || []);
  } catch (err) {
    console.error("Error fetching client payments:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
