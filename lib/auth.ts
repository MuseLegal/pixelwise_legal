import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/portal/sign-in");
  return data.user;
}

export async function requireAdmin() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single();
  if (profile?.role !== "admin") redirect("/dashboard");
  return user;
}
