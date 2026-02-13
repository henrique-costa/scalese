import { listarBombons } from "@/actions";
import BombonsTable from "@/components/admin/BombonsTable";
import Link from "next/link";

export const metadata = {
  title: "Gerenciar Bombons | Admin - Confetteria Scalese",
};

export default async function AdminBombonsPage() {
  const result = await listarBombons(false); // incluir indisponíveis
  const bombons = result.data ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Gerenciar Bombons
          </h1>
          <p className="text-brand-chocolate-light">
            Gerencie todos os bombons da confeitaria
          </p>
        </div>
        <Link
          href="/admin"
          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
        >
          ← Voltar ao Dashboard
        </Link>
      </div>

      <BombonsTable bombons={bombons} />
    </div>
  );
}
