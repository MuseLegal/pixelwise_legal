import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070b08]/90 backdrop-blur">
      <div className="container-frame flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-wide text-zinc-100">Pixelwise Legal</Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          <a href="#why">Why Pixelwise</a>
          <a href="#how">How It Works</a>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQs</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/portal/sign-in" className="text-sm text-zinc-300">Sign In</Link>
          <Button asChild size="sm"><Link href="/portal/sign-up">Get Started</Link></Button>
        </div>
      </div>
    </header>
  );
}
