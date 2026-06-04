import { LoginForm } from "./login-form";

export const metadata = { title: "Admin sign in — Meridian" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-navy-deep px-6">
      <div className="w-full max-w-sm">
        <div className="font-mono text-[12px] uppercase tracking-[0.2em] text-brass-soft">
          Meridian · Admin
        </div>
        <div className="mt-4 h-[3px] w-[48px] bg-brass" />
        <h1 className="mt-6 font-display text-[34px] font-semibold leading-tight text-paper">
          Admin sign in
        </h1>
        <p className="mt-2 font-sans text-sm text-paper/60">
          Manage presentations and access records.
        </p>
        <div className="mt-8 border border-white/10 bg-white p-6 shadow-page">
          <LoginForm
            next={next ?? "/admin"}
            initialError={
              error === "forbidden" ? "Admin access required." : undefined
            }
          />
        </div>
      </div>
    </main>
  );
}
