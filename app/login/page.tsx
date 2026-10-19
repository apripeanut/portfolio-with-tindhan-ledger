"use client";

import { useActionState } from "react";
import { signIn } from "./actions";

const initialState = {
  message: "",
  email: "",
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signIn, initialState);

  return (
    <main className="px-6 py-8">
      <div className="w-72">
        <h1 className="mb-6 text-xl font-bold">Admin sign in</h1>

        <form action={formAction} className="flex flex-col gap-3">
          <input
            name="email"
            type="email"
            placeholder="Email"
            defaultValue={state.email}
            className="border px-3 py-2"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="border px-3 py-2"
            required
          />

          {state.message && (
            <p className="text-sm text-red-600">{state.message}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="bg-black px-3 py-2 text-white"
          >
            {pending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
