import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { faqs } from "@/lib/content";

export default function FaqPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section container-frame">
        <h1>Frequently asked questions</h1>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <Card key={f.q}><CardHeader><h3>{f.q}</h3></CardHeader><CardContent className="text-sm text-zinc-400">{f.a}</CardContent></Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
