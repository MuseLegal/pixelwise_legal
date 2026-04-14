import Link from "next/link";
import { signInAction } from "@/app/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl md:text-3xl">Sign in</h1>
          <p className="mt-2 text-sm text-zinc-500">Secure client portal for Pixelwise Legal matters.</p>
        </CardHeader>
        <CardContent>
          <form action={signInAction} className="space-y-4">
            <Input name="email" type="email" placeholder="Work email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <Button type="submit" className="w-full">Continue</Button>
          </form>
          <p className="mt-4 text-sm text-zinc-500">New here? <Link className="text-[#16a34a]" href="/portal/sign-up">Create an account</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
