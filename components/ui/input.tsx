import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("h-10 w-full rounded-md border border-border px-3 text-sm outline-none focus:ring-2 focus:ring-black", className)} {...props} />;
}
