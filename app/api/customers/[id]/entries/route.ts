import { NextResponse } from "next/server";
import { z } from "zod";

import { getProfile } from "@/lib/auth";
import { addEntry, readCustomer, readEntries } from "@/lib/customers";

type Context = {
  params: Promise<{ id: string }>;
};

const EntrySchema = z.object({
  kind: z.enum(["owe", "payment"]),
  amount: z.number().finite().positive(),
});

// POST - Record a due or payment
export async function POST(request: Request, { params }: Context) {
  const profile = await getProfile(request);

  if (!profile) {
    return new NextResponse("", { status: 401 });
  }

  if (profile.role !== "admin") {
    return new NextResponse("", { status: 403 });
  }

  const { id } = await params;

  const customer = await readCustomer(id);

  if (!customer) {
    return new NextResponse("", { status: 404 });
  }

  const parsed = EntrySchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid transaction data" },
      { status: 400 },
    );
  }

  if (
    parsed.data.kind === "payment" &&
    parsed.data.amount > Number(customer.balance)
  ) {
    return NextResponse.json(
      { message: "Payment exceeds customer balance" },
      { status: 400 },
    );
  }

  try {
    const entry = await addEntry(id, parsed.data.kind, parsed.data.amount);

    return NextResponse.json(entry, {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to record entry:", error);

    return NextResponse.json(
      { message: "Unable to record transaction" },
      { status: 500 },
    );
  }
}

// GET - Retrieve customer transactions
export async function GET(request: Request, { params }: Context) {
  const profile = await getProfile(request);

  if (!profile) {
    return new NextResponse("", { status: 401 });
  }

  const { id } = await params;

  // Important: clients must only see their
  // own permitted customer records.
  if (profile.role !== "admin") {
    return NextResponse.json({ message: "Access denied" }, { status: 403 });
  }

  const customer = await readCustomer(id);

  if (!customer) {
    return new NextResponse("", { status: 404 });
  }

  const entries = await readEntries(id);

  return NextResponse.json(entries);
}

console.log("ENTRIES POST ROUTE REACHED");
