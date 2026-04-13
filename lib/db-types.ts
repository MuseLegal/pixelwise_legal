export type MatterStatus =
  | "Intake Submitted"
  | "Conflict Check"
  | "Attorney Assigned"
  | "In Review"
  | "Waiting on Client"
  | "Delivered"
  | "Complete";

export type MatterType = "contract_review" | "contract_drafting" | "advisory_question";

export type PaymentStatus = "pending" | "paid" | "failed";
