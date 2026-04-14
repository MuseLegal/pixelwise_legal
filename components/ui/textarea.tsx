import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-28 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-lime-300/50", className)} {...props} />;
}
