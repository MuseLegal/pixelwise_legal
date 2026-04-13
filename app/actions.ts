"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signUpAction(formData: FormData) {
  const supabase = createClient();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const firstName = String(formData.get("firstName") || "");
  const lastName = String(formData.get("lastName") || "");
  const companyName = String(formData.get("companyName") || "");
  const slackOptIn = formData.get("slackOptIn") === "on";

  const { data: authData, error } = await supabase.auth.signUp({ email, password });
  if (error || !authData.user) redirect("/portal/sign-up?error=1");

  const { data: company } = await supabase.from("companies").insert({ name: companyName }).select("id").single();
  if (company) {
    await supabase.from("profiles").upsert({
      user_id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      company_id: company.id,
      role: "client",
      slack_preference: slackOptIn
    });
  }

  redirect("/engagement");
}

export async function signInAction(formData: FormData) {
  const supabase = createClient();
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/portal/sign-in?error=1");
  redirect("/dashboard");
}

export async function acceptEngagementAction(formData: FormData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/portal/sign-in");

  const { data: profile } = await supabase.from("profiles").select("company_id").eq("user_id", data.user.id).single();
  const { data: version } = await supabase.from("engagement_terms_versions").select("id,version_label").eq("is_active", true).single();

  const entityName = String(formData.get("entityName") || "");
  const ipAddress = headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

  await supabase.from("engagement_acceptances").insert({
    user_id: data.user.id,
    company_id: profile?.company_id,
    terms_version_id: version?.id,
    ip_address: ipAddress,
    on_behalf_of_entity_name: entityName
  });

  redirect("/dashboard");
}

export async function createMatterAction(formData: FormData) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/portal/sign-in");

  const { data: profile } = await supabase.from("profiles").select("company_id").eq("user_id", data.user.id).single();
  const { data: acceptance } = await supabase.from("engagement_acceptances").select("id").eq("user_id", data.user.id).limit(1);
  if (!acceptance?.length) redirect("/engagement");

  await supabase.from("matters").insert({
    company_id: profile?.company_id,
    created_by: data.user.id,
    matter_type: formData.get("matterType"),
    title: formData.get("title"),
    description: formData.get("description"),
    counterparty: formData.get("counterparty"),
    urgency: formData.get("urgency"),
    slack_requested: formData.get("slackRequested") === "on",
    status: "Intake Submitted"
  });

  redirect("/dashboard");
}

export async function updateMatterStatusAction(formData: FormData) {
  const supabase = createClient();
  const matterId = String(formData.get("matterId"));
  const status = String(formData.get("status"));
  await supabase.from("matters").update({ status }).eq("id", matterId);
  redirect("/admin");
}
