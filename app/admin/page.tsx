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

  return (
    <AppShell title="Admin workspace" subtitle="Calm operations view for legal teams.">
      <Card className="mt-6">
        <CardHeader><h3>Matters</h3></CardHeader>
        <CardContent className="space-y-2">
          {matters?.map((m) => (
            <form action={updateMatterStatusAction} key={m.id} className="flex flex-wrap items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2">
              <input type="hidden" name="matterId" value={m.id} />
              <p className="min-w-56 text-sm font-medium">{m.title}</p>
              <select name="status" defaultValue={m.status} className="h-9 rounded-xl border border-zinc-200 bg-white px-2 text-sm">
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
