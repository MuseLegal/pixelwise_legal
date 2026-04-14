import Link from "next/link";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-[#f7f7f4]/90 backdrop-blur">
      <div className="container-wide flex h-14 items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">Pixelwise Legal</Link>
        <div className="flex items-center gap-2">
          <Link href="/portal/sign-in" className="text-sm text-zinc-600">Sign In</Link>
          <Button asChild variant="subtle" size="sm"><Link href="/portal/sign-up">Start</Link></Button>
        </div>
      </div>
    </header>
  );
}
