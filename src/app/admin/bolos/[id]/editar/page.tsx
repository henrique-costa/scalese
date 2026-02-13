import { buscarBolo } from "@/actions";
import BoloForm from "@/components/admin/BoloForm";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Editar Bolo | Admin - Confetteria Scalese",
};

interface EditarBoloPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditarBoloPage({ params }: EditarBoloPageProps) {
  const { id } = await params;
  const result = await buscarBolo(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const bolo = result.data;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brand-chocolate mb-2">
            Editar Bolo
          </h1>
          <p className="text-brand-chocolate-light">
            Edite as informações de {bolo.nome}
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
        <BoloForm bolo={bolo} />
      </div>
    </div>
  );
}
