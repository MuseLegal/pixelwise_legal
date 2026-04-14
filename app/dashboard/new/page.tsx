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
    <AppShell title="Create matter" subtitle="Submit a new contract review, drafting request, or advisory question.">
      <Card className="max-w-2xl">
        <CardHeader><h3>New intake</h3></CardHeader>
        <CardContent>
          <form action={createMatterAction} className="space-y-4">
            <Input name="title" placeholder="Matter title" required />
            <select name="matterType" className="h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm" required>
              <option value="contract_review">Contract review</option>
              <option value="contract_drafting">Contract drafting</option>
              <option value="advisory_question">Advisory question</option>
            </select>
            <Textarea name="description" placeholder="Describe what you need reviewed or drafted" required />
            <Input name="counterparty" placeholder="Counterparty" required />
            <select name="urgency" className="h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm">
              <option value="normal">Normal</option>
              <option value="priority">Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="checkbox" name="slackRequested" /> I want to collaborate in Slack</label>
            <Input type="file" name="contractFile" />
            <Button type="submit">Submit intake</Button>
          </form>
        </CardContent>
      </Card>
    </AppShell>
  );
}
