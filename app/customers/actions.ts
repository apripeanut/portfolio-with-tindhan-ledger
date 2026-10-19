"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getProfile } from "@/lib/auth";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { z } from "zod";
import { addEntry, readCustomer } from "@/lib/customers";

// State returned by the customer form
export type PostState = {
  message: string;
  name: string;
  balance: string;
};

// Validate customer information
const CustomerSchema = z.object({
  name: z.string().trim().min(1, "Customer name is required"),
  balance: z.coerce
    .number<number>()
    .finite()
    .min(0, "Balance cannot be negative"),
});

export type EntryState = {
  message: string;
  amount: string;
};

const EntrySchema = z.object({
  kind: z.enum(["owe", "payment"]),
  amount: z.coerce
    .number<number>()
    .finite()
    .positive("Amount must be greater than zero"),
});

// Existing Sign Out action
export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

// New Add Customer action
export async function addCustomer(
  _prev: PostState,
  form: FormData,
): Promise<PostState> {
  const typed = {
    name: String(form.get("name") ?? ""),
    balance: String(form.get("balance") ?? ""),
  };

  const profile = await getProfile();

  if (!profile) redirect("/login");

  if (profile.role !== "admin") {
    return {
      message: "Only the admin can add customers.",
      ...typed,
    };
  }

  const parsed = CustomerSchema.safeParse(typed);

  if (!parsed.success) {
    return {
      message: parsed.error.issues[0].message,
      ...typed,
    };
  }

  try {
    await db.insert(customers).values(parsed.data);
  } catch (error) {
    console.error("Failed to add customer:", error);

    return {
      message: "Something went wrong.",
      ...typed,
    };
  }

  revalidatePath("/customers");

  return {
    message: "",
    name: "",
    balance: "",
  };
}

export async function recordEntry(
  customerId: string,
  _prev: EntryState,
  form: FormData,
): Promise<EntryState> {
  const amount = String(form.get("amount") ?? "");

  // Verify the user
  const profile = await getProfile();

  if (!profile) redirect("/login");

  // Only administrators may record transactions
  if (profile.role !== "admin") {
    return {
      message: "Only the admin can add dues and payments.",
      amount,
    };
  }

  // Validate the transaction
  const parsed = EntrySchema.safeParse({
    kind: form.get("kind"),
    amount,
  });

  if (!parsed.success) {
    return {
      message: parsed.error.issues[0].message,
      amount,
    };
  }

  // Check whether the customer exists
  let customer;

  try {
    customer = await readCustomer(customerId);
  } catch (error) {
    console.error("Failed to read customer:", error);
    return {
      message: "Something went wrong.",
      amount,
    };
  }

  if (!customer) {
    return {
      message: "This customer was removed.",
      amount,
    };
  }

  // Prevent payments larger than the balance
  if (
    parsed.data.kind === "payment" &&
    parsed.data.amount > Number(customer.balance)
  ) {
    return {
      message: "Payment cannot exceed the customer balance.",
      amount,
    };
  }

  // Save transaction
  try {
    await addEntry(customerId, parsed.data.kind, parsed.data.amount);
  } catch (error) {
    console.error("Failed to record entry:", error);

    return {
      message: "Something went wrong.",
      amount,
    };
  }

  revalidatePath("/customers");
  revalidatePath(`/customers/${customerId}`);

  return {
    message: "",
    amount: "",
  };
}
