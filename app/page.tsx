import Link from "next/link";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pricingPlans, faqs } from "@/lib/content";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <section className="container pt-24">
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-7xl">The AI-Native Law Firm for Fast-Moving Companies.</h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600">Flat-fee contract support, faster turnarounds, attorney-led output, and optional Slack collaboration for teams that move quickly.</p>
        <div className="mt-8 flex gap-3">
          <Button asChild size="lg"><Link href="/portal/sign-up">Get Started</Link></Button>
          <Button asChild variant="outline" size="lg"><a href="mailto:hello@pixelwiselegal.com">Book a Consultation</a></Button>
        </div>
      </section>

      <section id="why" className="container">
        <h2 className="text-3xl font-semibold">Clarity over chaos.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {["Predictable flat-fee pricing", "Faster response and turnaround", "Clear status workflow for every matter", "Less email friction", "AI-enabled internal efficiency", "Attorney-led legal output"].map((item) => (
            <Card key={item}><CardContent className="pt-6 text-sm">{item}</CardContent></Card>
          ))}
        </div>
      </section>

      <section id="how" className="container">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Create your account and engage the firm", "Submit your contract or legal matter", "Collaborate and receive deliverables fast"].map((s, i) => (
            <Card key={s}><CardHeader><p className="text-xs text-zinc-500">Step {i + 1}</p></CardHeader><CardContent>{s}</CardContent></Card>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-3xl font-semibold">Pricing</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {pricingPlans.map((p) => (
            <Card key={p.key}><CardHeader><p className="font-medium">{p.title}</p></CardHeader><CardContent><p className="text-sm text-zinc-500">{p.detail}</p><p className="mt-3 text-2xl font-semibold">{p.price}</p></CardContent></Card>
          ))}
        </div>
      </section>

      <section className="container">
        <h2 className="text-3xl font-semibold">FAQs</h2>
        <div className="mt-8 space-y-4">
          {faqs.map((f) => (
            <Card key={f.q}><CardHeader><h3 className="font-medium">{f.q}</h3></CardHeader><CardContent className="text-sm text-zinc-600">{f.a}</CardContent></Card>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
