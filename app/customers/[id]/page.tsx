import Link from "next/link";
import { notFound } from "next/navigation";
import { verifyUser } from "@/lib/auth";
import { readCustomer, readEntries } from "@/lib/customers";
import EntryForm from "./entry-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CustomerPage({ params }: Props) {
  const { id } = await params;

  const profile = await verifyUser();
  const customer = await readCustomer(id);

  if (!customer) notFound();

  const entries = await readEntries(id);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/customers"
        className="text-sm text-orange-600 hover:underline"
      >
        ← Back to customers
      </Link>

      <h1 className="mt-6 text-3xl font-bold">{customer.name}</h1>

      <p className="mt-2 text-2xl font-semibold">
        ₱{Number(customer.balance).toFixed(2)}
      </p>

      <p className="mt-2 text-sm text-neutral-500">
        Last paid: {customer.lastPaid ?? "Never"}
      </p>

      {profile.role === "admin" && <EntryForm customerId={customer.id} />}

      <h2 className="mt-8 text-xl font-semibold">Dues and payments</h2>

      <ul className="mt-4 divide-y">
        {entries.map((entry) => (
          <li key={entry.id} className="flex justify-between py-3">
            <div>
              <p className="font-medium">
                {entry.kind === "payment" ? "Payment" : "Due"}
              </p>
              <p className="text-sm text-neutral-500">
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={
                entry.kind === "payment" ? "text-green-600" : "text-red-600"
              }
            >
              {entry.kind === "payment" ? "−" : "+"}₱
              {Number(entry.amount).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </main>
  );
}
