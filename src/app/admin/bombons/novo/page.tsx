import BombomForm from "@/components/admin/BombomForm";
import Link from "next/link";

export const metadata = {
  title: "Novo Bombom | Admin - Confetteria Scalese",
};

export default function NovoBombomPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Novo Bombom
          </h1>
          <p className="text-brand-chocolate-light">
            Cadastre um novo bombom no catálogo
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
        <BombomForm />
      </div>
    </div>
  );
}
