import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pricingPlans } from "@/lib/content";

export default function PricingPage() {
  return (
    <main>
      <SiteHeader />
      <section className="container">
        <h1 className="text-5xl font-semibold">Transparent pricing.</h1>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <Card key={plan.key}><CardHeader className="font-medium">{plan.title}</CardHeader><CardContent><p className="text-zinc-600">{plan.detail}</p><p className="mt-2 text-3xl font-semibold">{plan.price}</p></CardContent></Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
