import { buscarBombom } from "@/actions";
import BombomForm from "@/components/admin/BombomForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Editar Bombom | Admin - Confetteria Scalese",
};

interface EditarBombomPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarBombomPage({ params }: EditarBombomPageProps) {
  const { id } = await params;
  const result = await buscarBombom(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const bombom = result.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Editar Bombom
          </h1>
          <p className="text-brand-chocolate-light">
            Edite as informações de {bombom.nome}
          </p>
        </div>
        <Link
          href="/admin/bombons"
          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
        >
          ← Voltar para Bombons
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-8">
        <BombomForm bombom={bombom} />
      </div>
    </div>
  );
}
