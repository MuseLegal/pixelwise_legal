import { acceptEngagementAction } from "@/app/actions";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function EngagementPage() {
  await requireUser();
  const supabase = createClient();
  const { data: terms } = await supabase.from("engagement_terms_versions").select("version_label,body_markdown,file_path").eq("is_active", true).single();

  return (
    <main className="container py-16">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <h1 className="text-3xl font-semibold">Engagement Acceptance</h1>
          <p className="text-sm text-zinc-600">You are accepting these terms on behalf of a business entity.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">Current Terms Version: <strong>{terms?.version_label || "v1.0"}</strong></p>
          <a className="text-sm text-accent underline" href={terms?.file_path || "/engagement-letter-v1.pdf"} download>Download Engagement Letter (PDF)</a>
          <div className="rounded-md border border-border p-4 text-sm text-zinc-700 whitespace-pre-wrap">{terms?.body_markdown || "Engagement terms placeholder. Replace with full legal text."}</div>
          <form action={acceptEngagementAction} className="space-y-3">
            <Input name="entityName" placeholder="Business entity name" required />
            <label className="flex items-start gap-2 text-sm"><input required type="checkbox" /> I accept these terms on behalf of my business entity.</label>
            <Button type="submit">Accept and Continue</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
