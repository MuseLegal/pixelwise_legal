import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { updateMatterStatusAction } from "@/app/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STATUSES = ["Intake Submitted", "Conflict Check", "Attorney Assigned", "In Review", "Waiting on Client", "Delivered", "Complete"];

export default async function AdminPage() {
  await requireAdmin();
  const supabase = createClient();
  const { data: matters } = await supabase.from("matters").select("id,title,status,company_id").order("created_at", { ascending: false });
  const { data: companies } = await supabase.from("companies").select("id,name").order("created_at", { ascending: false }).limit(20);
  const { data: users } = await supabase.from("profiles").select("user_id,first_name,last_name,role").limit(20);

  return (
    <main className="container py-12">
      <h1 className="text-4xl font-semibold">Admin</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card><CardHeader>Companies</CardHeader><CardContent>{companies?.map((c) => <p key={c.id} className="text-sm">{c.name}</p>)}</CardContent></Card>
        <Card><CardHeader>Users</CardHeader><CardContent>{users?.map((u) => <p key={u.user_id} className="text-sm">{u.first_name} {u.last_name} ({u.role})</p>)}</CardContent></Card>
        <Card><CardHeader>Notes</CardHeader><CardContent className="text-sm text-zinc-600">Use admin_notes for internal comments and tracking.</CardContent></Card>
      </div>
      <Card className="mt-6">
        <CardHeader>Matters</CardHeader>
        <CardContent className="space-y-3">
          {matters?.map((m) => (
            <form action={updateMatterStatusAction} key={m.id} className="flex flex-wrap items-center gap-2 rounded-md border border-border p-3">
              <input type="hidden" name="matterId" value={m.id} />
              <p className="min-w-64 text-sm font-medium">{m.title}</p>
              <select name="status" defaultValue={m.status} className="h-9 rounded-md border border-border px-2 text-sm">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <Button size="sm" type="submit">Update</Button>
            </form>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
