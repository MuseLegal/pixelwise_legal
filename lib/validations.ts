import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  slackOptIn: z.boolean().default(false),
  agreeToTerms: z.literal(true)
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const matterSchema = z.object({
  title: z.string().min(2),
  matterType: z.enum(["contract_review", "contract_drafting", "advisory_question"]),
  description: z.string().min(10),
  counterparty: z.string().min(1),
  urgency: z.enum(["normal", "priority", "urgent"]),
  slackRequested: z.boolean().default(false)
});
