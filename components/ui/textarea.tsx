import { cn } from "@/lib/utils";

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-28 w-full rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black", className)} {...props} />;
}
