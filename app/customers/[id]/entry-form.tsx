"use client";

import { useActionState } from "react";
import { recordEntry } from "../actions";

export default function EntryForm({ customerId }: { customerId: string }) {
  const [state, action, pending] = useActionState(
    recordEntry.bind(null, customerId),
    {
      message: "",
      amount: "",
    },
  );

  return (
    <form action={action} className="my-6 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <input
          name="amount"
          type="number"
          inputMode="decimal"
          step="0.01"
          min="0.01"
          defaultValue={state.amount}
          placeholder="Amount"
          required
          className="w-48 rounded border px-4 py-2"
        />

        <button
          type="submit"
          name="kind"
          value="owe"
          disabled={pending}
          className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50"
        >
          Add due
        </button>

        <button
          type="submit"
          name="kind"
          value="payment"
          disabled={pending}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
        >
          Record payment
        </button>
      </div>

      {state.message && <p className="text-sm text-red-700">{state.message}</p>}
    </form>
  );
}
