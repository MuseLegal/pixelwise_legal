import Link from "next/link";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { faqs, pricingPlans } from "@/lib/content";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="section container-tight text-center">
        <h1 className="mx-auto max-w-2xl">Legal work, handled clearly.</h1>
        <p className="mx-auto mt-4 max-w-xl text-zinc-500">Flat-fee contracts, faster turnarounds, attorney-led delivery, and AI-assisted internal workflows.</p>

        <Card className="mx-auto mt-8 max-w-2xl text-left">
          <CardHeader>
            <h3>Start a request</h3>
            <p className="mt-1 text-sm text-zinc-500">Upload a contract, describe what you need, or ask an advisory question.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input placeholder="Describe your legal request..." />
            <div className="flex flex-wrap gap-2">
              <Button asChild><Link href="/portal/sign-up">Start contract review</Link></Button>
              <Button asChild variant="outline"><Link href="/dashboard/new">Upload contract</Link></Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="section container-tight">
        <h2>How it works</h2>
        <div className="mt-5 grid gap-3">
          {[
            ["01", "Start the engagement", "Create your account and define the matter."],
            ["02", "Attorney-led + AI-accelerated", "Counsel leads delivery while AI improves speed."],
            ["03", "Clear pricing and delivery", "Flat fees, clear scope, predictable timelines."]
          ].map(([n, t, d]) => (
            <Card key={n}><CardContent className="flex items-start gap-3 pt-5"><p className="text-xs text-zinc-400">{n}</p><div><p className="text-sm font-medium">{t}</p><p className="text-sm text-zinc-500">{d}</p></div></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="section container-tight">
        <h2>Pricing</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {pricingPlans.map((p) => (
            <Card key={p.key}><CardContent className="pt-5"><p className="text-sm font-medium">{p.title}</p><p className="text-sm text-zinc-500">{p.detail}</p><p className="mt-2 text-xl font-semibold">{p.price}</p></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="section container-tight">
        <h2>FAQ</h2>
        <div className="mt-5 space-y-3">
          {faqs.slice(0, 4).map((f) => (
            <Card key={f.q}><CardContent className="pt-5"><p className="text-sm font-medium">{f.q}</p><p className="mt-1 text-sm text-zinc-500">{f.a}</p></CardContent></Card>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
