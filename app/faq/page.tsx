import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { faqs } from "@/lib/content";

export default function FaqPage() {
  return (
    <main>
      <SiteHeader />
      <section className="container">
        <h1 className="text-5xl font-semibold">FAQs</h1>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <Card key={f.q}><CardHeader><h2 className="font-medium">{f.q}</h2></CardHeader><CardContent className="text-zinc-600">{f.a}</CardContent></Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
