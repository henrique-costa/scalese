import ComboForm from "@/components/admin/ComboForm";
import Link from "next/link";

export const metadata = {
  title: "Novo Combo | Admin - Confetteria Scalese",
};

export default function NovoComboPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Novo Combo Festa
          </h1>
          <p className="text-brand-chocolate-light">
            Cadastre um novo combo no catálogo
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
        <ComboForm />
      </div>
    </div>
  );
}
