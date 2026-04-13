import { createMatterAction } from "@/app/actions";
import { requireUser } from "@/lib/auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default async function NewMatterPage() {
  await requireUser();
  return (
    <main className="container py-12">
      <Card className="mx-auto max-w-2xl">
        <CardHeader><h1 className="text-3xl font-semibold">Create Matter</h1></CardHeader>
        <CardContent>
          <form action={createMatterAction} className="space-y-4">
            <Input name="title" placeholder="Matter title" required />
            <select name="matterType" className="h-10 w-full rounded-md border border-border px-3 text-sm" required>
              <option value="contract_review">Contract Review</option>
              <option value="contract_drafting">Contract Drafting</option>
              <option value="advisory_question">Advisory Question</option>
            </select>
            <Textarea name="description" placeholder="Describe your matter" required />
            <Input name="counterparty" placeholder="Counterparty" required />
            <select name="urgency" className="h-10 w-full rounded-md border border-border px-3 text-sm">
              <option value="normal">Normal</option>
              <option value="priority">Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="slackRequested" /> I want to collaborate in Slack</label>
            <Input type="file" name="contractFile" />
            <Button type="submit">Submit Intake</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
