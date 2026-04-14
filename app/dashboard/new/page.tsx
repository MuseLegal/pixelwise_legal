import { createMatterAction } from "@/app/actions";
import { requireUser } from "@/lib/auth";
import { AppShell } from "@/components/dashboard/app-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default async function NewMatterPage() {
  await requireUser();

  return (
    <AppShell title="Start a new request" subtitle="Describe the work. We’ll route it immediately.">
      <Card className="mt-6">
        <CardHeader><h3>Matter intake</h3></CardHeader>
        <CardContent>
          <form action={createMatterAction} className="space-y-3">
            <Input name="title" placeholder="Matter title" required />
            <select name="matterType" className="h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800" required>
              <option value="contract_review">Contract review</option>
              <option value="contract_drafting">Contract drafting</option>
              <option value="advisory_question">Advisory question</option>
            </select>
            <Textarea name="description" placeholder="What do you need done?" required />
            <Input name="counterparty" placeholder="Counterparty" required />
            <select name="urgency" className="h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800">
              <option value="normal">Normal</option>
              <option value="priority">Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="checkbox" name="slackRequested" /> I want Slack collaboration</label>
            <Input type="file" name="contractFile" />
            <Button type="submit">Submit request</Button>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}
