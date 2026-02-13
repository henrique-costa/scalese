import { listarBolos } from "@/actions";
import BolosTable from "@/components/admin/BolosTable";
import Link from "next/link";

export const metadata = {
  title: "Gerenciar Bolos | Admin - Confetteria Scalese",
};

export default async function AdminBolosPage() {
  const result = await listarBolos(false);
  const bolos = result.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Gerenciar Bolos
          </h1>
          <p className="text-brand-chocolate-light">
            Gerencie todos os bolos da confeitaria
          </p>
        </div>
        <Link
          href="/admin"
          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
        >
          ← Voltar ao Dashboard
        </Link>
      </div>

      <BolosTable bolos={bolos} />
    </div>
  );
}
