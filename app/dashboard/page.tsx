import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
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
    <main className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <p className="text-zinc-600">Welcome back, {profile?.first_name || "Client"}.</p>
        </div>
        <Button asChild><Link href="/dashboard/new">Create New Matter</Link></Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader className="font-medium">Engagement</CardHeader><CardContent>{acceptance?.length ? <Badge>Accepted</Badge> : <Link href="/engagement" className="text-accent">Pending acceptance</Link>}</CardContent></Card>
        <Card><CardHeader className="font-medium">Payment State</CardHeader><CardContent className="text-sm text-zinc-600">Tracked per matter after checkout completion.</CardContent></Card>
        <SlackConnectionCard companyId={profile?.company_id || ""} />
      </div>
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between"><h2 className="font-medium">Matters</h2></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matters?.length ? matters.map((matter) => (
              <Link key={matter.id} href={`/dashboard/matters/${matter.id}`} className="flex items-center justify-between rounded-md border border-border p-3 hover:bg-muted">
                <div>
                  <p className="font-medium">{matter.title}</p>
                  <p className="text-xs text-zinc-500">{matter.matter_type}</p>
                </div>
                <Badge>{matter.status}</Badge>
              </Link>
            )) : <p className="text-sm text-zinc-600">No matters yet.</p>}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
