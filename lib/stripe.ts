import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20"
});

export const PRICE_MAP: Record<string, { amount: number; label: string }> = {
  short_review: { amount: 25000, label: "Short Contract Review" },
  standard_review: { amount: 50000, label: "Standard Contract Review" },
  long_review: { amount: 1000, label: "Long Contract Review (per page)" },
  drafting: { amount: 200000, label: "Contract Drafting" }
};
