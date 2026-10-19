import Link from "next/link";
import type { Project } from "@/lib/projects";

type Props = { projects: Project[] };
export function ProjectList({ projects }: Props) {
  if (projects.length === 0) {
    return <p className="mt-8 text-xl text-blue-950">No projects match.</p>;
  }
  return (
    <ul className="mt-8 space-y-4 text-xl">
      {projects.map((p) => (
        <li key={p.slug}>
          <Link href={`/projects/${p.slug}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}
