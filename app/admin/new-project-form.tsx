"use client";

import { useActionState } from "react";
import { createProject } from "./actions";

const initialState = {
  message: "",
};

export default function NewProjectForm() {
  const [state, formAction, pending] = useActionState(
    createProject,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 flex max-w-md flex-col gap-4">
      <label>
        Title
        <input
          name="title"
          type="text"
          required
          className="block w-full border p-2"
        />
      </label>

      <label>
        Year
        <input
          name="year"
          type="number"
          required
          className="block w-full border p-2"
        />
      </label>

      <label>
        Summary
        <textarea name="summary" required className="block w-full border p-2" />
      </label>

      <label>
        Choose the hero image
        <input
          name="image"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          required
          className="block"
        />
      </label>

      {state.message && <p className="text-red-600">{state.message}</p>}

      <button type="submit" disabled={pending} className="border px-4 py-2">
        {pending ? "Posting..." : "Post project"}
      </button>
    </form>
  );
}
