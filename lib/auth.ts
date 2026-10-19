import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Profile } from "@/db/schema";
import { cache } from "react";
import { redirect } from "next/navigation";

export async function getProfile(request?: Request): Promise<Profile | null> {
  const token = request?.headers.get("Authorization")?.replace("Bearer ", "");

  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims(token).catch(() => ({
    data: null,
    error: new Error("Unable to verify session"),
  }));

  if (error || !data?.claims) return null;

  const { sub: id, email = "" } = data.claims;

  try {
    await db
      .insert(profiles)
      .values({
        id,
        email: String(email),
        role: "client",
      })
      .onConflictDoNothing();

    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, id));

    return profile ?? null;
  } catch (error) {
    console.error("PROFILE DATABASE ERROR:", error);

    if (error instanceof Error) {
      console.error("DATABASE CAUSE:", error.cause);
    }

    throw error;
  }
}

export const verifyUser = cache(async () => {
  const profile = await getProfile();

  if (!profile) redirect("/login");

  return profile;
});
