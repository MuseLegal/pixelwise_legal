import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-sm font-semibold">Pixelwise Legal</Link>
        <nav className="hidden gap-6 text-sm md:flex">
          <a href="#why">Why Pixelwise</a>
          <a href="#how">How It Works</a>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQs</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/portal/sign-in" className="text-sm">Sign In</Link>
          <Button asChild size="sm"><Link href="/portal/sign-up">Get Started</Link></Button>
        </div>
      </div>
    </header>
  );
}
