import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function AppShell({ title, subtitle, children, rightRail }: { title: string; subtitle?: string; children: React.ReactNode; rightRail?: React.ReactNode; }) {
  return (
    <main className="min-h-screen bg-[#070b08]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-[240px_minmax(0,1fr)_300px]">
        <aside>
          <Card className="sticky top-24">
            <CardHeader><p className="text-sm font-semibold text-zinc-100">Pixelwise Legal</p></CardHeader>
            <CardContent className="space-y-2 text-sm text-zinc-400">
              <Link className="block hover:text-zinc-100" href="/dashboard">Dashboard</Link>
              <Link className="block hover:text-zinc-100" href="/dashboard/new">New Matter</Link>
              <Link className="block hover:text-zinc-100" href="/engagement">Engagement</Link>
              <Link className="block hover:text-zinc-100" href="/pricing">Pricing</Link>
              <Link className="block hover:text-zinc-100" href="/admin">Admin</Link>
            </CardContent>
          </Card>
        </aside>
        <section>
          <div className="mb-8">
            <h1 className="text-4xl font-semibold text-zinc-100">{title}</h1>
            {subtitle ? <p className="mt-2 text-sm text-zinc-400">{subtitle}</p> : null}
          </div>
          {children}
        </section>
        <aside className="hidden lg:block">{rightRail}</aside>
      </div>
    </main>
  );
}
