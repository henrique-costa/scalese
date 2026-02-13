import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();
  const role = (user?.publicMetadata as { role?: string })?.role;

  if (role !== "admin") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-brand-cream">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-6">🔒</div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-4">
            Acesso Restrito
          </h1>
          <p className="font-body text-brand-chocolate-light mb-8">
            Você não tem permissão para acessar o painel administrativo.
          </p>
          <Link href="/" className="btn-primary">
            Voltar ao Início
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream-warm">
      <header className="bg-brand-chocolate text-white sticky top-0 z-50">
        <div className="container-scalese flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-display text-lg font-bold text-white">
              Scalese <span className="text-brand-rose text-sm font-body font-normal">Admin</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link href="/admin" className="font-body text-sm text-white/70 hover:text-brand-rose">Dashboard</Link>
              <Link href="/admin/bombons" className="font-body text-sm text-white/70 hover:text-brand-rose">Bombons</Link>
              <Link href="/admin/bolos" className="font-body text-sm text-white/70 hover:text-brand-rose">Bolos</Link>
              <Link href="/admin/combos" className="font-body text-sm text-white/70 hover:text-brand-rose">Combos</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-body text-white/60 hover:text-white">Ver Site →</Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
      <main className="container-scalese py-8">{children}</main>
    </div>
  );
}