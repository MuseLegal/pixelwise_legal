import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-zinc-200 px-2.5 py-0.5 text-xs text-zinc-700", className)} {...props} />;
}
