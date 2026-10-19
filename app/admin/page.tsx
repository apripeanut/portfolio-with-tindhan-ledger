import { signOut, verifyAdmin } from "./actions";
import NewProjectForm from "./new-project-form";

export default async function AdminPage() {
  const admin = await verifyAdmin();

  return (
    <main className="px-16 py-8">
      <h1 className="text-4xl font-bold">New project post</h1>

      <form action={signOut}>
        <p>{admin.email}</p>
        <button type="submit">Sign out</button>
      </form>

      <NewProjectForm />
    </main>
  );
}
