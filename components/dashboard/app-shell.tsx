import Link from "next/link";

export function AppShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode; }) {
  return (
    <main className="min-h-screen bg-[#f7f7f4]">
      <div className="container-wide py-8">
        <header className="mb-8 flex items-center justify-between border-b border-zinc-200/80 pb-4">
          <div>
            <p className="text-sm font-semibold">Pixelwise Legal</p>
            {subtitle ? <p className="text-sm text-zinc-500">{subtitle}</p> : null}
          </div>
          <nav className="flex items-center gap-4 text-sm text-zinc-600">
            <Link href="/dashboard">Workspace</Link>
            <Link href="/dashboard/new">New Matter</Link>
            <Link href="/engagement">Engagement</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </header>

        <section className="mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl">{title}</h1>
          {children}
        </section>
      </div>
    </main>
  );
}
