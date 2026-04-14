import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/lib/content";

export default function FaqPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section container-tight">
        <h1>FAQ</h1>
        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <Card key={f.q}><CardContent className="pt-5"><p className="text-sm font-medium">{f.q}</p><p className="mt-1 text-sm text-zinc-500">{f.a}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
