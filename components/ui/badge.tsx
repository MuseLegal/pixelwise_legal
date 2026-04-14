import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-zinc-300", className)} {...props} />;
}
