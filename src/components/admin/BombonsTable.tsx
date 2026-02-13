"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import DeleteModal from "./DeleteModal";
import ToggleSwitch from "./ToggleSwitch";
import { adminDeletarBombom, adminAtualizarBombom } from "@/actions";
import { formatPrice } from "@/lib/utils";
import type { Bombom } from "@prisma/client";

interface BombonsTableProps {
  bombons: Bombom[];
}

export default function BombonsTable({ bombons }: BombonsTableProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    bombom: Bombom | null;
  }>({ isOpen: false, bombom: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // Filtrar bombons
  const bomsonsFiltrados = bombons.filter(
    (bombom) =>
      bombom.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bombom.sabor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteModal.bombom) return;

    setIsDeleting(true);
    const result = await adminDeletarBombom(deleteModal.bombom.id);

    if (result.success) {
      setDeleteModal({ isOpen: false, bombom: null });
      router.refresh();
    } else {
      alert(result.error || "Erro ao deletar bombom");
    }
    setIsDeleting(false);
  };

  const handleToggle = async (
    bombom: Bombom,
    field: "destaque" | "disponivel"
  ) => {
    const result = await adminAtualizarBombom({
      id: bombom.id,
      [field]: !bombom[field],
    });

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || "Erro ao atualizar bombom");
    }
  };

  return (
    <>
      {/* Busca */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome ou sabor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 border-2 border-brand-cream focus:border-brand-rose rounded-xl focus:outline-none"
        />
        <Link href="/admin/bombons/novo" className="btn-primary whitespace-nowrap">
          + Novo Bombom
        </Link>
      </div>

      {/* Contador */}
      <p className="text-sm text-brand-chocolate-light mb-4">
        {bomsonsFiltrados.length} {bomsonsFiltrados.length === 1 ? "bombom" : "bombons"}{" "}
        {searchTerm && "encontrado(s)"}
      </p>

      {/* Tabela */}
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
                  Peso/Un.
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
              {bomsonsFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-chocolate-light">
                    {searchTerm ? "Nenhum bombom encontrado" : "Nenhum bombom cadastrado"}
                  </td>
                </tr>
              ) : (
                bomsonsFiltrados.map((bombom) => (
                  <tr key={bombom.id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {bombom.imagemUrl && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                            <Image
                              src={bombom.imagemUrl}
                              alt={bombom.nome}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-brand-chocolate">{bombom.nome}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-chocolate-light">
                      {bombom.sabor}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-brand-rose">
                      {formatPrice(bombom.preco)}
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-chocolate-light">
                      {bombom.peso}g · {bombom.unidades}un
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ToggleSwitch
                        enabled={bombom.destaque}
                        onChange={() => handleToggle(bombom, "destaque")}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ToggleSwitch
                        enabled={bombom.disponivel}
                        onChange={() => handleToggle(bombom, "disponivel")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/bombons/${bombom.id}/editar`}
                          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({ isOpen: true, bombom })
                          }
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

      {/* Modal de confirmação */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, bombom: null })}
        onConfirm={handleDelete}
        itemName={deleteModal.bombom?.nome || ""}
        isDeleting={isDeleting}
      />
    </>
  );
}
