"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DeleteModal from "./DeleteModal";
import ToggleSwitch from "./ToggleSwitch";
import { adminDeletarCombo, adminAtualizarCombo } from "@/actions";
import { formatPrice } from "@/lib/utils";
import type { ComboFesta } from "@prisma/client";

interface CombosTableProps {
  combos: ComboFesta[];
}

export default function CombosTable({ combos }: CombosTableProps) {
  const [items, setItems] = useState(combos);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    combo: ComboFesta | null;
  }>({ isOpen: false, combo: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const combosFiltrados = items.filter((combo) =>
    combo.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteModal.combo) return;

    setIsDeleting(true);
    const result = await adminDeletarCombo(deleteModal.combo.id);

    if (result.success) {
      const deletedId = deleteModal.combo.id;
      setDeleteModal({ isOpen: false, combo: null });
      setItems((prev) => prev.filter((c) => c.id !== deletedId));
    } else {
      alert(result.error || "Erro ao deletar combo");
    }
    setIsDeleting(false);
  };

  const handleToggle = async (combo: ComboFesta, field: "destaque" | "disponivel") => {
    // Optimistic update
    setItems((prev) =>
      prev.map((c) => (c.id === combo.id ? { ...c, [field]: !c[field] } : c))
    );

    const result = await adminAtualizarCombo({
      id: combo.id,
      [field]: !combo[field],
    });

    if (!result.success) {
      // Revert on error
      setItems((prev) =>
        prev.map((c) => (c.id === combo.id ? { ...c, [field]: combo[field] } : c))
      );
      alert(result.error || "Erro ao atualizar combo");
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-96 px-4 py-3 border-2 border-brand-cream focus:border-brand-rose rounded-xl focus:outline-none"
        />
        <Link href="/admin/combos/novo" className="btn-primary whitespace-nowrap">
          + Novo Combo
        </Link>
      </div>

      <p className="text-sm text-brand-chocolate-light mb-4">
        {combosFiltrados.length} {combosFiltrados.length === 1 ? "combo" : "combos"}{" "}
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
                  Tema
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-brand-chocolate">
                  Preço
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-brand-chocolate">
                  Serve
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
              {combosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-chocolate-light">
                    {searchTerm ? "Nenhum combo encontrado" : "Nenhum combo cadastrado"}
                  </td>
                </tr>
              ) : (
                combosFiltrados.map((combo) => (
                  <tr key={combo.id} className="hover:bg-brand-cream/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {combo.imagemUrl && (
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-brand-cream flex-shrink-0">
                            <Image
                              src={combo.imagemUrl}
                              alt={combo.nome}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-brand-chocolate">{combo.nome}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-chocolate-light">
                      {combo.temaBolo || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-brand-rose">
                      {formatPrice(combo.preco)}
                    </td>
                    <td className="px-6 py-4 text-sm text-brand-chocolate-light">
                      {combo.servePessoas} pessoas
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ToggleSwitch
                        enabled={combo.destaque}
                        onChange={() => handleToggle(combo, "destaque")}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ToggleSwitch
                        enabled={combo.disponivel}
                        onChange={() => handleToggle(combo, "disponivel")}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/combos/${combo.id}/editar`}
                          className="text-brand-gold hover:text-brand-gold-dark transition-colors text-sm font-medium"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, combo })}
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
        onClose={() => setDeleteModal({ isOpen: false, combo: null })}
        onConfirm={handleDelete}
        itemName={deleteModal.combo?.nome || ""}
        isDeleting={isDeleting}
      />
    </>
  );
}
