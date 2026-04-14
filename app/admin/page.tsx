import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { updateMatterStatusAction } from "@/app/actions";
import { AppShell } from "@/components/dashboard/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATUSES = ["Intake Submitted", "Conflict Check", "Attorney Assigned", "In Review", "Waiting on Client", "Delivered", "Complete"];

export default async function AdminPage() {
  await requireAdmin();
  const supabase = createClient();
  const { data: matters } = await supabase.from("matters").select("id,title,status").order("created_at", { ascending: false });
  const { data: companies } = await supabase.from("companies").select("id,name").order("created_at", { ascending: false }).limit(20);
  const { data: users } = await supabase.from("profiles").select("user_id,first_name,last_name,role").limit(20);

  return (
    <AppShell title="Admin" subtitle="Operational view for internal legal workflows and delivery.">
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><h3>Companies</h3></CardHeader><CardContent>{companies?.map((c) => <p key={c.id} className="text-sm text-zinc-400">{c.name}</p>)}</CardContent></Card>
        <Card><CardHeader><h3>Users</h3></CardHeader><CardContent>{users?.map((u) => <p key={u.user_id} className="text-sm text-zinc-400">{u.first_name} {u.last_name} ({u.role})</p>)}</CardContent></Card>
        <Card><CardHeader><h3>Notes</h3></CardHeader><CardContent className="text-sm text-zinc-400">Use admin_notes for conflict checks, negotiation strategy, and delivery context.</CardContent></Card>
      </div>
      <Card className="mt-6">
        <CardHeader><h3>Matter queue</h3></CardHeader>
        <CardContent className="space-y-3">
          {matters?.map((m) => (
            <form action={updateMatterStatusAction} key={m.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
              <input type="hidden" name="matterId" value={m.id} />
              <p className="min-w-64 text-sm font-medium">{m.title}</p>
              <select name="status" defaultValue={m.status} className="h-9 rounded-lg border border-white/15 bg-white/5 px-2 text-sm text-zinc-100">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Button size="sm" type="submit">Update</Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </AppShell>
  );
}
