import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/dashboard/app-shell";
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
    <AppShell title={matter.title} subtitle="Matter status, files, updates, and deliverables.">
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader className="text-sm font-medium">Matter status</CardHeader><CardContent><Badge>{matter.status}</Badge></CardContent></Card>
        <Card><CardHeader className="text-sm font-medium">Payment status</CardHeader><CardContent className="text-sm text-zinc-400">{payment?.status || "pending"}{payment?.amount_cents ? ` · $${payment.amount_cents / 100}` : ""}</CardContent></Card>
        <Card><CardHeader className="text-sm font-medium">Slack collaboration</CardHeader><CardContent className="text-sm text-zinc-400">{matter.slack_requested ? "Requested" : "Portal-only"}</CardContent></Card>
      </div>
      <Card className="mt-6"><CardHeader><h3>Description</h3></CardHeader><CardContent className="text-sm text-zinc-400">{matter.description}</CardContent></Card>
      <Card className="mt-6"><CardHeader><h3>Uploaded files & deliverables</h3></CardHeader><CardContent>{files?.length ? files.map((f) => <p key={f.storage_path} className="text-sm text-zinc-400">{f.file_name} ({f.file_kind})</p>) : <p className="text-sm text-zinc-400">No files yet.</p>}</CardContent></Card>
      <Card className="mt-6"><CardHeader><h3>Recent updates</h3></CardHeader><CardContent>{comments?.length ? comments.map((c, i) => <p key={i} className="mb-3 text-sm text-zinc-400">{c.body}</p>) : <p className="text-sm text-zinc-400">No updates yet.</p>}</CardContent></Card>
    </AppShell>
  );
}
