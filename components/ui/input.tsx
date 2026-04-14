import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-11 w-full rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 focus:border-zinc-300", className)} {...props} />;
}
