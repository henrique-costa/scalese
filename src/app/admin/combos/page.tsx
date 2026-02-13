import { listarCombos } from "@/actions";
import CombosTable from "@/components/admin/CombosTable";
import Link from "next/link";

export const metadata = {
  title: "Gerenciar Combos | Admin - Confetteria Scalese",
};

export default async function AdminCombosPage() {
  const result = await listarCombos(false);
  const combos = result.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Gerenciar Combos Festa
          </h1>
          <p className="text-brand-chocolate-light">
            Gerencie todos os combos da confeitaria
          </p>
        </div>
        <Link
          href="/admin"
          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
        >
          ← Voltar ao Dashboard
        </Link>
      </div>

      <CombosTable combos={combos} />
    </div>
  );
}
