import { readStats } from "@/lib/projects";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await readStats());
}
