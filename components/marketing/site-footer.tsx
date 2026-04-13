import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col gap-4 text-sm text-zinc-600 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Pixelwise Legal</p>
        <div className="flex gap-4">
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
