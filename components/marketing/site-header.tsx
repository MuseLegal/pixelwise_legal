import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">Pixelwise Legal</Link>
        <nav className="hidden items-center gap-6 text-sm text-zinc-600 md:flex">
          <a href="#why">Why Pixelwise</a>
          <a href="#how">How It Works</a>
          <Link href="/pricing">Pricing</Link>
          <Link href="/faq">FAQs</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/portal/sign-in" className="text-sm text-zinc-600">Sign In</Link>
          <Button asChild size="sm"><Link href="/portal/sign-up">Get Started</Link></Button>
        </div>
      </div>
    </header>
  );
}
