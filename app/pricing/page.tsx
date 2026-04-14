import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pricingPlans } from "@/lib/content";

export default function PricingPage() {
  return (
    <main className="bg-white">
      <SiteHeader />
      <section className="section mx-auto max-w-6xl px-6">
        <h1>Flat-fee legal pricing.</h1>
        <p className="mt-4 max-w-2xl text-zinc-500">No hourly surprises. Each engagement starts with clear scope and clear cost.</p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <Card key={plan.key}>
              <CardHeader><h3>{plan.title}</h3></CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500">{plan.detail}</p>
                <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
