"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  message?: string;
  email?: string;
};

export async function signIn(
  _prev: LoginState,
  form: FormData,
): Promise<LoginState> {
  const email = String(form.get("email"));
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: String(form.get("password")),
  });

  if (error) {
    return {
      message: "Wrong email or password.",
      email,
    };
  }

  redirect("/admin");
}
