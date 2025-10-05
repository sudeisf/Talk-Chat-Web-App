import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Helper Profile",
  description: "View and edit your helper profile details.",
};

export default function HelperProfilePage() {
  return (
    <main className="w-full max-w-5xl mx-auto min-h-screen p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Helper Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your public helper information and preferences.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="md:col-span-2 rounded-lg border bg-white p-4">
          <h2 className="text-lg font-medium mb-3">About</h2>
          <p className="text-sm text-muted-foreground">
            This is your helper profile page. You can customize this content
            later by adding fields like bio, expertise, and availability. For
            now, this page exists to satisfy Next.js&apos;s requirement for a
            default export.
          </p>
        </section>

        <aside className="rounded-lg border bg-white p-4">
          <h3 className="text-lg font-medium mb-3">Quick stats</h3>
          <ul className="text-sm space-y-1">
            <li>Questions answered: 0</li>
            <li>Sessions joined: 0</li>
            <li>Avg. response time: —</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
