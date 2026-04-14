import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200/80 py-8">
      <div className="container-tight flex flex-col gap-3 text-sm text-zinc-500 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Pixelwise Legal</p>
        <div className="flex flex-wrap gap-4">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Contact</Link>
          <Link href="/faq">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
