import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent } from "@/components/ui/card";
import { pricingPlans } from "@/lib/content";

export default function PricingPage() {
  return (
    <main>
      <SiteHeader />
      <section className="section container-tight">
        <h1>Flat-fee pricing</h1>
        <p className="mt-3 text-zinc-500">Simple pricing for contract review, drafting, and advisory support.</p>
        <div className="mt-6 grid gap-3">
          {pricingPlans.map((plan) => (
            <Card key={plan.key}><CardContent className="pt-5"><p className="text-sm font-medium">{plan.title}</p><p className="text-sm text-zinc-500">{plan.detail}</p><p className="mt-1 text-lg font-semibold">{plan.price}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
