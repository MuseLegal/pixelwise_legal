import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/dashboard/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlackConnectionCard } from "@/components/dashboard/slack-connection-card";

export default async function DashboardPage() {
  const user = await requireUser();
  const supabase = createClient();
  const { data: profile } = await supabase.from("profiles").select("company_id,first_name").eq("user_id", user.id).single();
  const { data: matters } = await supabase.from("matters").select("id,title,status,matter_type,created_at").eq("company_id", profile?.company_id).order("created_at", { ascending: false });
  const { data: acceptance } = await supabase.from("engagement_acceptances").select("accepted_at").eq("user_id", user.id).limit(1);

  return (
    <AppShell
      title="Dashboard"
      subtitle="Track active matters, payments, engagement state, and collaboration settings."
      rightRail={<SlackConnectionCard companyId={profile?.company_id || ""} />}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader className="text-sm font-medium">Engagement</CardHeader><CardContent>{acceptance?.length ? <Badge>Accepted</Badge> : <Link href="/engagement" className="text-sm text-[#16a34a]">Pending acceptance</Link>}</CardContent></Card>
        <Card><CardHeader className="text-sm font-medium">Payment status</CardHeader><CardContent className="text-sm text-zinc-500">Recorded per matter after checkout.</CardContent></Card>
        <Card><CardHeader className="text-sm font-medium">Uploaded files</CardHeader><CardContent className="text-sm text-zinc-500">Client uploads and deliverables appear on each matter.</CardContent></Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <h3 className="text-base font-medium">Active matters</h3>
          <Button asChild size="sm"><Link href="/dashboard/new">New matter</Link></Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matters?.length ? matters.map((matter) => (
              <Link key={matter.id} href={`/dashboard/matters/${matter.id}`} className="flex items-center justify-between rounded-lg border border-zinc-200 px-4 py-3 hover:bg-zinc-50">
                <div>
                  <p className="text-sm font-medium">{matter.title}</p>
                  <p className="text-xs text-zinc-500">{matter.matter_type}</p>
                </div>
                <Badge>{matter.status}</Badge>
              </Link>
            )) : <p className="text-sm text-zinc-500">No matters yet.</p>}
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
