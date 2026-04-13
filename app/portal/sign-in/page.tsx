import Link from "next/link";
import { signInAction } from "@/app/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <main className="container flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader><h1 className="text-3xl font-semibold">Sign in</h1></CardHeader>
        <CardContent>
          <form action={signInAction} className="space-y-4">
            <Input name="email" type="email" placeholder="Work email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
          <p className="mt-4 text-sm">New here? <Link className="text-accent" href="/portal/sign-up">Create an account</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
