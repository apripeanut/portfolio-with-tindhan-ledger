"use client";

import { useActionState } from "react";
import { addCustomer } from "./actions";

export default function NewCustomerForm() {
  const [state, action, pending] = useActionState(addCustomer, {
    message: "",
    name: "",
    balance: "",
  });

  return (
    <form action={action} className="my-6 flex flex-wrap gap-2">
      <input
        name="name"
        defaultValue={state.name}
        placeholder="Name"
        required
        className="w-48 rounded border px-4 py-2"
      />

      <input
        name="balance"
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        defaultValue={state.balance}
        placeholder="Amount owed"
        required
        className="w-40 rounded border px-4 py-2"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {pending ? "Adding..." : "Add customer"}
      </button>

      {state.message && <p className="w-full text-red-700">{state.message}</p>}
    </form>
  );
}
