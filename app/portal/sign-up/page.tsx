import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <main className="container flex min-h-screen items-center justify-center py-16">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <h1 className="text-3xl font-semibold">Create your Pixelwise Legal account</h1>
          <p className="mt-2 text-sm text-zinc-600">Business-client representation only. By registering, you confirm authority to act for your company.</p>
        </CardHeader>
        <CardContent>
          <form action={signUpAction} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Input name="firstName" placeholder="First name" required />
              <Input name="lastName" placeholder="Last name" required />
            </div>
            <Input name="companyName" placeholder="Company name" required />
            <Input name="email" type="email" placeholder="Work email" required />
            <Input name="password" type="password" placeholder="Password" required />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="slackOptIn" /> I want to work in Slack with Pixelwise Legal</label>
            <label className="flex items-start gap-2 text-sm"><input type="checkbox" required /> I acknowledge engagement terms and that I am accepting legal services on behalf of a business entity.</label>
            <Button className="w-full" type="submit">Create Account</Button>
          </form>
          <p className="mt-4 text-sm text-zinc-600">Already have an account? <Link href="/portal/sign-in" className="text-accent">Sign in</Link></p>
        </CardContent>
      </Card>
    </main>
  );
}
