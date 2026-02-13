"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DeleteModal from "./DeleteModal";
import ToggleSwitch from "./ToggleSwitch";
import { adminDeletarBolo, adminAtualizarBolo } from "@/actions";
import { formatPrice } from "@/lib/utils";
import type { Bolo } from "@prisma/client";

interface BolosTableProps {
  bolos: Bolo[];
}

export default function BolosTable({ bolos }: BolosTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    bolo: Bolo | null;
  }>({ isOpen: false, bolo: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const bolosFiltrados = bolos.filter(
    (bolo) =>
      bolo.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bolo.sabor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteModal.bolo) return;

    setIsDeleting(true);
    const result = await adminDeletarBolo(deleteModal.bolo.id);

    if (result.success) {
      setDeleteModal({ isOpen: false, bolo: null });
      router.refresh();
    } else {
      alert(result.error || "Erro ao deletar bolo");
    }
    setIsDeleting(false);
  };

  const handleToggle = async (bolo: Bolo, field: "destaque" | "disponivel") => {
    const result = await adminAtualizarBolo({
      id: bolo.id,
      [field]: !bolo[field],
    });

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Erro ao atualizar bolo");
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome ou sabor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 border-2 border-brand-cream focus:border-brand-rose rounded-xl focus:outline-none"
        />
        <Link href="/admin/bolos/novo" className="btn-primary whitespace-nowrap">
          + Novo Bolo
        </Link>
      </div>

      <p className="text-sm text-brand-chocolate-light mb-4">
        {bolosFiltrados.length} {bolosFiltrados.length === 1 ? "bolo" : "bolos"}{" "}
        {searchTerm && "encontrado(s)"}
      </p>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-brand-cream">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-brand-chocolate">
                  Produto
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-brand-chocolate">
                  Sabor
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-brand-chocolate">
                  Preço
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-brand-chocolate">
                  Tamanho/Porções
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-brand-chocolate">
                  Destaque
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-brand-chocolate">
                  Disponível
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-brand-chocolate">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-cream">
              {bolosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-chocolate-light">
                    {searchTerm ? "Nenhum bolo encontrado" : "Nenhum bolo cadastrado"}
                  </td>
                </tr>
              ) : (
                bolosFiltrados.map((bolo) => (
                  <tr key={bolo.id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {bolo.imagemUrl && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                            <Image
                              src={bolo.imagemUrl}
                              alt={bolo.nome}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-brand-chocolate">{bolo.nome}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-chocolate-light">
                      {bolo.sabor}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-brand-rose">
                      {formatPrice(bolo.preco)}
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-chocolate-light">
                      {bolo.tamanho} · {bolo.porcoes} porções
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ToggleSwitch
                        enabled={bolo.destaque}
                        onChange={() => handleToggle(bolo, "destaque")}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ToggleSwitch
                        enabled={bolo.disponivel}
                        onChange={() => handleToggle(bolo, "disponivel")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/bolos/${bolo.id}/editar`}
                          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, bolo })}
                          className="text-red-500 hover:text-red-600 transition-colors text-sm font-medium"
                        >
                          Excluir
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, bolo: null })}
        onConfirm={handleDelete}
        itemName={deleteModal.bolo?.nome || ""}
        isDeleting={isDeleting}
      />
    </>
  );
}
