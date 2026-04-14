import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/dashboard/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: profile } = await supabase.from("profiles").select("company_id,first_name").eq("user_id", user.id).single();
  const { data: matters } = await supabase.from("matters").select("id,title,status,matter_type").eq("company_id", profile?.company_id).order("created_at", { ascending: false });
  const { data: acceptance } = await supabase.from("engagement_acceptances").select("accepted_at").eq("user_id", user.id).limit(1);

  return (
    <AppShell title={`Welcome${profile?.first_name ? `, ${profile.first_name}` : ""}`} subtitle="A focused workspace for legal requests.">
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <Card><CardContent className="pt-5"><p className="text-xs text-zinc-500">Engagement</p>{acceptance?.length ? <Badge>Accepted</Badge> : <Link href="/engagement" className="text-sm text-zinc-800 underline">Pending</Link>}</CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-xs text-zinc-500">Payment</p><p className="text-sm">Per-matter status</p></CardContent></Card>
        <Card><CardContent className="pt-5"><p className="text-xs text-zinc-500">Collaboration</p><p className="text-sm">Portal-first · Slack optional</p></CardContent></Card>
      </div>

      <Card className="mt-4">
        <CardHeader className="flex flex-row items-center justify-between"><h3>Active matters</h3><Button asChild size="sm"><Link href="/dashboard/new">Start request</Link></Button></CardHeader>
        <CardContent className="space-y-2">
          {matters?.length ? matters.map((m) => (
            <Link key={m.id} href={`/dashboard/matters/${m.id}`} className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-2 hover:bg-zinc-50">
              <div><p className="text-sm font-medium">{m.title}</p><p className="text-xs text-zinc-500">{m.matter_type}</p></div>
              <Badge>{m.status}</Badge>
            </Link>
          )) : <p className="text-sm text-zinc-500">No matters yet.</p>}
        </CardContent>
      </Card>
    </AppShell>
  );
}
