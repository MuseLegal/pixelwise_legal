import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-3xl md:text-3xl">Create account</h1>
          <p className="mt-2 text-sm text-zinc-500">Set up your workspace to start legal requests.</p>
        </CardHeader>
        <CardContent>
          <form action={signUpAction} className="space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input name="firstName" placeholder="First name" required />
              <Input name="lastName" placeholder="Last name" required />
            </div>
            <Input name="companyName" placeholder="Company name" required />
            <Input name="email" type="email" placeholder="Work email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <label className="flex items-center gap-2 text-sm text-zinc-600"><input type="checkbox" name="slackOptIn" /> Work with us in Slack</label>
            <label className="flex items-start gap-2 text-sm text-zinc-600"><input type="checkbox" required /> I accept engagement terms on behalf of my business.</label>
            <Button className="w-full" type="submit">Continue</Button>
          </form>
          <p className="mt-4 text-sm text-zinc-500">Already have an account? <Link href="/portal/sign-in" className="underline">Sign in</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
