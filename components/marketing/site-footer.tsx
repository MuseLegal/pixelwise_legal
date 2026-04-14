import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-frame flex flex-col gap-4 text-sm text-zinc-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Pixelwise Legal</p>
        <div className="flex flex-wrap gap-5">
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Firm</Link>
          <Link href="/faq">FAQs</Link>
        </div>
      </div>
    </footer>
  );
}
