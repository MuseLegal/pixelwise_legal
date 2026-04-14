import Link from "next/link";
import { SiteHeader } from "@/components/marketing/site-header";
import { SiteFooter } from "@/components/marketing/site-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { pricingPlans, faqs } from "@/lib/content";

const valueItems = [
  { title: "Flat-fee legal ops", body: "Predictable pricing for contract review and drafting, designed for fast-moving teams." },
  { title: "Attorney-led output", body: "Experienced counsel reviews every deliverable. AI accelerates internal research and process." },
  { title: "Faster turnaround", body: "Structured workflows, less email friction, and clear matter-level status updates." },
  { title: "Slack-oriented collaboration", body: "Collaborate in portal by default, then activate Slack as an optional workspace." }
];

export default function HomePage() {
  return (
    <main>
      <SiteHeader />

      <section className="section container-frame pt-24">
        <div className="inline-flex rounded-full border border-lime-300/40 bg-lime-300/10 px-3 py-1 text-xs text-lime-200">AI-native law firm for startups & growth companies</div>
        <h1 className="mt-5 max-w-4xl">The AI-native law firm for fast-moving companies.</h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-400">Flat-fee contract review, fast turnaround, and human attorney oversight with AI-accelerated internal workflows.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg"><Link href="/portal/sign-up">Get Started</Link></Button>
          <Button asChild variant="outline" size="lg"><a href="mailto:hello@pixelwiselegal.com">Book a Consultation</a></Button>
        </div>
      </section>

      <section id="why" className="section container-frame">
        <h2>Built for modern legal execution</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {valueItems.map((item) => (
            <Card key={item.title}><CardHeader><h3>{item.title}</h3></CardHeader><CardContent className="text-sm text-zinc-400">{item.body}</CardContent></Card>
          ))}
        </div>
      </section>

      <section id="how" className="section container-frame">
        <h2>How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card><CardHeader><p className="text-xs text-lime-200">01</p><h3>Start the engagement</h3></CardHeader><CardContent className="text-sm text-zinc-400">Create your account, define your matter, and choose your collaboration mode.</CardContent></Card>
          <Card><CardHeader><p className="text-xs text-lime-200">02</p><h3>Attorney-led + AI-accelerated review</h3></CardHeader><CardContent className="text-sm text-zinc-400">Counsel handles legal analysis while AI improves throughput and internal precision.</CardContent></Card>
          <Card><CardHeader><p className="text-xs text-lime-200">03</p><h3>Flat, predictable pricing</h3></CardHeader><CardContent className="text-sm text-zinc-400">Clear prices up front. Faster legal delivery with no hourly billing surprises.</CardContent></Card>
        </div>
      </section>

      <section className="section container-frame">
        <h2>Pricing</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pricingPlans.map((plan) => (
            <Card key={plan.key}>
              <CardHeader><p className="font-medium">{plan.title}</p></CardHeader>
              <CardContent><p className="text-sm text-zinc-400">{plan.detail}</p><p className="mt-4 text-2xl font-semibold">{plan.price}</p></CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="section container-frame">
        <h2>FAQs</h2>
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
