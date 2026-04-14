import { NextResponse } from "next/server";
import { stripe, PRICE_MAP } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.json();
  const priceKey = String(body.priceKey || "");
  const selected = PRICE_MAP[priceKey];

  if (!selected || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "usd",
        product_data: { name: selected.label },
        unit_amount: selected.amount
      }
    }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?checkout=cancel`
  });

  return NextResponse.json({ url: session.url });
}
