"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { ProjectPostSchema } from "@/lib/definitions";
import { db } from "@/db";
import { projects } from "@/db/schema";

const BUCKET = "project-images";

export type ProjectState = {
  message?: string;
};

export async function verifyAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}

export async function createProject(
  _prev: ProjectState,
  form: FormData,
): Promise<ProjectState> {
  await verifyAdmin();

  const typed = {
    title: String(form.get("title") ?? ""),
    year: String(form.get("year") ?? ""),
    summary: String(form.get("summary") ?? ""),
  };

  const parsed = ProjectPostSchema.safeParse({
    ...typed,
    image: form.get("image"),
  });

  if (!parsed.success) {
    return {
      message: parsed.error.issues[0].message,
    };
  }

  const { title, year, summary, image } = parsed.data;

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const extension = image.name.split(".").pop() ?? "jpg";
  const path = `${slug}-${crypto.randomUUID()}.${extension}`;

  const supabase = await createClient();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, image, {
      contentType: image.type,
    });

  if (uploadError) {
    return {
      message: uploadError.message,
    };
  }

  const imageUrl = supabase.storage.from(BUCKET).getPublicUrl(path)
    .data.publicUrl;

  try {
    await db.insert(projects).values({
      slug,
      title,
      year,
      summary,
      imageUrl,
    });
  } catch (e) {
    await supabase.storage.from(BUCKET).remove([path]);
    throw e;
  }

  revalidatePath("/projects");
  redirect(`/projects/${slug}`);
}
