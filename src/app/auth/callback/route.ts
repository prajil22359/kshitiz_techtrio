import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");

  // ✅ USE QUERY PARAMS (CORRECT WAY)
  const roleFromQuery = url.searchParams.get("role");
  const flow = url.searchParams.get("flow");

  if (!code) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data.user) {
    console.error("exchangeCodeForSession error:", error);
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  const user = data.user;
  const meta = user.user_metadata ?? {};

  const name =
    meta.full_name ??
    meta.name ??
    (`${meta.first_name ?? ""} ${meta.last_name ?? ""}`.trim() ||
      user.email ||
      "");

  // ✅ FIX ROLE (VERY IMPORTANT)
  const role = roleFromQuery === "vendor" ? "vendor" : "client";

  const { data: profile } = await supabase
    .from("users")
    .select("role, name, company_name, phone, alternate_email")
    .eq("id", user.id)
    .maybeSingle();

  const finalRole =
    flow === "signup"
      ? role
      : profile?.role ?? role;

  const registerPath =
    finalRole === "vendor" ? "/register/vendor" : "/register/client";

  // ✅ FIRST: HANDLE SIGNUP FLOW
  if (flow === "signup") {
    return NextResponse.redirect(
      new URL(`${registerPath}?oauth=1`, url.origin)
    );
  }

  // ✅ THEN: CHECK PROFILE COMPLETION
  const needsProfileCompletion =
    !profile?.name ||
    !profile?.phone ||
    (finalRole === "vendor" && !profile?.company_name);

  if (needsProfileCompletion) {
    return NextResponse.redirect(
      new URL(`${registerPath}?oauth=1`, url.origin)
    );
  }

  // ✅ UPSERT USER (SAFE)
  try {
    const admin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error: upsertError } = await admin.from("users").upsert(
      {
        id: user.id,
        email: user.email ?? "",
        name,
        role: finalRole,
        company_name: meta.business_name ?? null,
        phone: meta.phone ?? null,
        alternate_email: meta.alternate_email ?? null,
      },
      { onConflict: "id" }
    );

    if (upsertError) {
      console.error("Callback admin upsert failed:", upsertError);
    }
  } catch (err) {
    console.error("Callback admin upsert exception:", err);
  }

  // ✅ FINAL REDIRECT
  const destination =
    finalRole === "vendor"
      ? "/vendor/dashboard"
      : "/client/dashboard";

  return NextResponse.redirect(new URL(destination, url.origin));
}