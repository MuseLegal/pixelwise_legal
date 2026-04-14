import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Pixelwise Legal</p>
        <div className="flex gap-5">
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
