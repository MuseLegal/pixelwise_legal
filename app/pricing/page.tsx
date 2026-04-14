import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pricingPlans } from "@/lib/content";

export default function PricingPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section container-frame">
        <h1>Transparent, flat-fee pricing</h1>
        <p className="mt-4 max-w-2xl text-zinc-400">Designed for product teams that need speed and certainty in legal execution.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <Card key={plan.key}><CardHeader><h3>{plan.title}</h3></CardHeader><CardContent><p className="text-sm text-zinc-400">{plan.detail}</p><p className="mt-3 text-3xl font-semibold">{plan.price}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
