import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPaymentConfirmation(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) return { skipped: true };
  return resend.emails.send({ from: process.env.RESEND_FROM_EMAIL!, to, subject, html });
}
