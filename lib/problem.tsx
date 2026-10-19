import { z } from "zod";

export function problemFor(e: unknown) {
  const m = e instanceof Error ? e.message : "";
  if (m === "timeout") return "The server took too long.";
  if (m === "offline") return "The server did not answer. Check it is running.";
  if (m === "404") return "That is not there any more.";
  return "Something went wrong.";
}

export function Problem({ message }: { message: string }) {
  return <p className="mt-6 text-xl text-neutral-500">{message}</p>;
}

export const CustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "The name needs at least 2 characters." }),
  balance: z.coerce
    .number({ error: "Enter the amount owed as a number." })
    .min(0, { error: "The amount owed cannot be negative." }),
});
export const CredentialsSchema = z.object({
  email: z.email({ error: "Enter a valid email." }),
  password: z
    .string()
    .min(6, { error: "The password needs at least 6 characters." }),
});
export const EntrySchema = z.object({
  kind: z.enum(["due", "payment"], { error: "Choose a due or a payment." }),
  amount: z.coerce
    .number({ error: "Enter the amount as a number." })
    .positive({ error: "The amount must be more than zero." }),
});
