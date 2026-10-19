"use client";

import type { Project } from "@/lib/projects";
import { ProjectList } from "./project-list";
import { useState } from "react";

type Props = {
  projects: Project[];
};

export function ProjectSearch({ projects }: Props) {
  const [query, setQuery] = useState("");

  const shown = projects.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects"
        className="mt-8 w-80 border-2 px-4 py-2 border-blue-950 rounded-xl text-blue-950 placeholder:text-blue-900/55 focus:outline-none focus:border-blue-900 caret-blue-950"
      />

      <ProjectList projects={shown} />
    </>
  );
}
