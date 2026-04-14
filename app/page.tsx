import Link from "next/link";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pricingPlans, faqs } from "@/lib/content";

const values = [
  "Flat-fee contract review and drafting.",
  "Attorney-led work with AI-accelerated internal operations.",
  "Fast turnaround with clear scope and status visibility.",
  "Optional Slack-oriented collaboration for product teams."
];

export default function HomePage() {
  return (
    <main className="bg-white">
      <SiteHeader />

      <section className="section mx-auto max-w-6xl px-6 pt-24">
        <h1 className="max-w-4xl">Think clearly. Move faster.</h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-500">
          Pixelwise Legal is an AI-native law firm for startups and growth-stage companies: flat-fee contract support, faster execution, and attorney-led deliverables.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/portal/sign-up">Get Started</Link></Button>
          <Button asChild variant="outline" size="lg"><a href="mailto:hello@pixelwiselegal.com">Book a Consultation</a></Button>
        </div>
      </section>

      <section id="why" className="section mx-auto max-w-6xl px-6">
        <h2>Why Pixelwise</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {values.map((value) => (
            <Card key={value}><CardContent className="pt-6 text-sm text-zinc-700">{value}</CardContent></Card>
          ))}
        </div>
      </section>

      <section id="how" className="section mx-auto max-w-6xl px-6">
        <h2>How It Works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader><p className="text-xs text-zinc-400">01</p><h3>Start the Engagement</h3></CardHeader>
            <CardContent className="text-sm text-zinc-600">Create your account, define your matter, and choose how you want to work with us.</CardContent>
          </Card>
          <Card>
            <CardHeader><p className="text-xs text-zinc-400">02</p><h3>Attorney-Led + AI-Accelerated Review</h3></CardHeader>
            <CardContent className="text-sm text-zinc-600">Experienced counsel handles the work, with AI supporting speed and internal efficiency.</CardContent>
          </Card>
          <Card>
            <CardHeader><p className="text-xs text-zinc-400">03</p><h3>Flat, Predictable Pricing</h3></CardHeader>
            <CardContent className="text-sm text-zinc-600">Clear pricing up front. Faster delivery without hourly billing surprises.</CardContent>
          </Card>
        </div>
      </section>

      <section className="section mx-auto max-w-6xl px-6">
        <h2>Pricing</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Card key={plan.key}>
              <CardHeader><p className="text-sm font-medium">{plan.title}</p></CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500">{plan.detail}</p>
                <p className="mt-4 text-2xl font-semibold">{plan.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section mx-auto max-w-6xl px-6">
        <h2>FAQ</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <Card key={f.q}>
              <CardHeader><h3>{f.q}</h3></CardHeader>
              <CardContent className="text-sm text-zinc-600">{f.a}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
