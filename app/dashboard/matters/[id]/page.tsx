import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function MatterDetailPage({ params }: { params: { id: string } }) {
  const user = await requireUser();
  const supabase = createClient();
  const { data: profile } = await supabase.from("profiles").select("company_id").eq("user_id", user.id).single();
  const { data: matter } = await supabase.from("matters").select("*").eq("id", params.id).eq("company_id", profile?.company_id).single();
  const { data: comments } = await supabase.from("matter_comments").select("body,created_at").eq("matter_id", params.id).order("created_at", { ascending: false });
  const { data: files } = await supabase.from("matter_files").select("file_name,file_kind,storage_path").eq("matter_id", params.id);
  const { data: payment } = await supabase.from("payments").select("status,amount_cents").eq("matter_id", params.id).single();

  if (!matter) return notFound();

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-semibold">{matter.title}</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card><CardHeader>Status</CardHeader><CardContent><Badge>{matter.status}</Badge></CardContent></Card>
        <Card><CardHeader>Payment</CardHeader><CardContent className="text-sm">{payment?.status || "pending"} {payment?.amount_cents ? `· $${payment.amount_cents / 100}` : ""}</CardContent></Card>
        <Card><CardHeader>Slack</CardHeader><CardContent className="text-sm">{matter.slack_requested ? "Requested" : "Not requested"}</CardContent></Card>
      </div>
      <Card className="mt-6"><CardHeader>Description</CardHeader><CardContent className="text-zinc-700">{matter.description}</CardContent></Card>
      <Card className="mt-6"><CardHeader>Files & Deliverables</CardHeader><CardContent>{files?.length ? files.map((f) => <p key={f.storage_path} className="text-sm">{f.file_name} ({f.file_kind})</p>) : <p className="text-sm text-zinc-600">No files yet.</p>}</CardContent></Card>
      <Card className="mt-6"><CardHeader>Updates</CardHeader><CardContent>{comments?.length ? comments.map((c, i) => <p key={i} className="mb-3 text-sm">{c.body}</p>) : <p className="text-sm text-zinc-600">No updates yet.</p>}</CardContent></Card>
    </main>
  );
}
