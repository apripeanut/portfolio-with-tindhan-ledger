import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export type Project = {
  id?: string;
  slug: string;
  title: string;
  year: number;
  summary: string | null;
  imageUrl: string | null;
};

export type Stats = {
  total: number;
  newest: number;
  oldest: number;
};

export async function readProjects(): Promise<Project[]> {
  return db.select().from(projects);
}

export async function readProject(slug: string): Promise<Project | null> {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function readStats(): Promise<Stats> {
  const allProjects = await db.select().from(projects);

  const years = allProjects.map((p) => p.year);

  return {
    total: allProjects.length,
    newest: Math.max(...years),
    oldest: Math.min(...years),
  };
}
