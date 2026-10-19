import "server-only";
import type { Project, Stats } from "@/lib/projects";

const BASE = process.env.API_BASE_URL;
if (!BASE) throw new Error("Set API_BASE_URL in .env");

function timeout(ms: number): Promise<never> {
  return new Promise((_, fail) =>
    setTimeout(() => fail(new Error("timeout")), ms),
  );
}

async function get(path: string) {
  let res: Response;

  try {
    res = await Promise.race([fetch(BASE + path), timeout(8000)]);
  } catch (e) {
    throw new Error(
      e instanceof Error && e.message === "timeout" ? "timeout" : "offline",
    );
  }

  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

export const fetchProjects = (): Promise<Project[]> => get("/api/projects");

export const fetchProject = (slug: string): Promise<Project> =>
  get("/api/projects/" + slug);

export const fetchStats = (): Promise<Stats> => get("/api/stats");
