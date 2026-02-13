import { buscarCombo } from "@/actions";
import ComboForm from "@/components/admin/ComboForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Editar Combo | Admin - Confetteria Scalese",
};

interface EditarComboPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarComboPage({ params }: EditarComboPageProps) {
  const { id } = await params;
  const result = await buscarCombo(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const combo = result.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Editar Combo
          </h1>
          <p className="text-brand-chocolate-light">
            Edite as informações de {combo.nome}
          </p>
        </div>
        <Link
          href="/admin/combos"
          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
        >
          ← Voltar para Combos
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-8">
        <ComboForm combo={combo} />
      </div>
    </div>
  );
}
