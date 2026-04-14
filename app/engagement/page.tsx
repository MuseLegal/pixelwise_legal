import { acceptEngagementAction } from "@/app/actions";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function EngagementPage() {
  await requireUser();
  const supabase = createClient();
  const { data: terms } = await supabase
    .from("engagement_terms_versions")
    .select("version_label,body_markdown,file_path")
    .eq("is_active", true)
    .single();

  return (
    <main className="section bg-white px-6">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <h1 className="text-3xl md:text-3xl">Engagement acceptance</h1>
          <p className="mt-2 text-sm text-zinc-500">You are accepting these terms on behalf of a business entity.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">Current version: <strong>{terms?.version_label || "v1.0"}</strong></p>
          <a className="text-sm text-[#16a34a] underline" href={terms?.file_path || "/engagement-letter-v1.pdf"} download>Download engagement letter (PDF)</a>
          <div className="whitespace-pre-wrap rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">{terms?.body_markdown || "Engagement terms placeholder."}</div>
          <form action={acceptEngagementAction} className="space-y-3">
            <Input name="entityName" placeholder="Business entity legal name" required />
            <label className="flex items-start gap-2 text-sm text-zinc-600"><input required type="checkbox" /> I accept these terms and confirm authority to bind this business entity.</label>
            <Button type="submit">Accept and continue</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
