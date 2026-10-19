import Link from "next/link";
import { verifyUser } from "@/lib/auth";
import { readCustomers } from "@/lib/customers";
import { signOut } from "./actions";
import NewCustomerForm from "./new-customer-form";

export default async function CustomersPage() {
  const profile = await verifyUser();
  const customers = await readCustomers();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <span className="text-sm text-neutral-500">
            {profile.email} · {profile.role}
          </span>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border px-4 py-2 hover:bg-neutral-100"
          >
            Sign Out
          </button>
        </form>
      </div>

      {profile.role === "admin" && <NewCustomerForm />}

      <ul className="divide-y rounded-lg border">
        {customers.map((c) => (
          <li key={c.id}>
            <Link
              href={`/customers/${c.id}`}
              className="flex justify-between py-3 px-4 hover:bg-neutral-50"
            >
              <span className="text-xl">{c.name}</span>
              <span className="tabular-nums">
                ₱{Number(c.balance).toFixed(2)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
