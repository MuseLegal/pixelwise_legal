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
  const { data: comments } = await supabase.from("matter_comments").select("body").eq("matter_id", params.id).order("created_at", { ascending: false });
  const { data: files } = await supabase.from("matter_files").select("file_name,file_kind,storage_path").eq("matter_id", params.id);
  const { data: payment } = await supabase.from("payments").select("status,amount_cents").eq("matter_id", params.id).single();

  if (!matter) return notFound();

  return (
    <AppShell title={matter.title} subtitle="Focused view of current progress.">
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Card><CardContent className="pt-5"><p className="text-xs text-zinc-500">Status</p><Badge>{matter.status}</Badge></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-xs text-zinc-500">Payment</p><p className="text-sm">{payment?.status || "pending"}{payment?.amount_cents ? ` · $${payment.amount_cents / 100}` : ""}</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-xs text-zinc-500">Slack</p><p className="text-sm">{matter.slack_requested ? "Requested" : "Not requested"}</p></CardContent></Card>
      </div>
      <Card className="mt-4"><CardHeader><h3>Description</h3></CardHeader><CardContent className="text-sm text-zinc-600">{matter.description}</CardContent></Card>
      <Card className="mt-4"><CardHeader><h3>Files</h3></CardHeader><CardContent>{files?.length ? files.map((f) => <p key={f.storage_path} className="text-sm text-zinc-600">{f.file_name} ({f.file_kind})</p>) : <p className="text-sm text-zinc-500">No files yet.</p>}</CardContent></Card>
      <Card className="mt-4"><CardHeader><h3>Updates</h3></CardHeader><CardContent>{comments?.length ? comments.map((c, i) => <p key={i} className="mb-2 text-sm text-zinc-600">{c.body}</p>) : <p className="text-sm text-zinc-500">No updates yet.</p>}</CardContent></Card>
    </AppShell>
  );
}
