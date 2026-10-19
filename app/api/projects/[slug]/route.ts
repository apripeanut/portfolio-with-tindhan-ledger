import { readProject } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const project = await readProject(slug);
  if (!project) return new NextResponse("", { status: 404 });
  return NextResponse.json(project);
}
