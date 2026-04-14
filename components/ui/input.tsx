import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-11 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-lime-300/50", className)} {...props} />;
}
