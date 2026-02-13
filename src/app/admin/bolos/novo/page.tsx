import BoloForm from "@/components/admin/BoloForm";
import Link from "next/link";

export const metadata = {
  title: "Novo Bolo | Admin - Confetteria Scalese",
};

export default function NovoBoloPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Novo Bolo
          </h1>
          <p className="text-brand-chocolate-light">
            Cadastre um novo bolo no catálogo
          </p>
        </div>
        <Link
          href="/admin/bolos"
          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
        >
          ← Voltar para Bolos
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-8">
        <BoloForm />
      </div>
    </div>
  );
}
