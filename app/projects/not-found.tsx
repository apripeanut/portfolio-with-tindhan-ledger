import Link from "next/link";
export default function NotFound() {
  return (
    <main className="px-16 py-8">
      <h1 className="text-4xl font-bold">No such project</h1>
      <p className="mt-6 text-xl text-blue-950">
        That project must have been removed.
      </p>
      <Link
        href="/projects"
        className="mt-6 inline-block border-2 border-blue-950 rounded-lg p-2"
      >
        Back to projects
      </Link>
    </main>
  );
}
