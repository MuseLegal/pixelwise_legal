import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const sig = headers().get("stripe-signature");
  const body = await req.text();

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Missing webhook config" }, { status: 400 });
  }

  try {
    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    // TODO: update payments table based on checkout.session.completed
    return NextResponse.json({ received: true, type: event.type });
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
