"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import ToggleSwitch from "./ToggleSwitch";
import { adminCriarCombo, adminAtualizarCombo } from "@/actions";
import type { ComboFesta } from "@prisma/client";

interface ComboFormProps {
  combo?: ComboFesta;
  onSuccess?: () => void;
}

export default function ComboForm({ combo, onSuccess }: ComboFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Parse itensInclusos se existir
  let itensInicial = [""];
  if (combo?.itensInclusos) {
    try {
      itensInicial = JSON.parse(combo.itensInclusos);
    } catch {
      itensInicial = [""];
    }
  }

  const [formData, setFormData] = useState({
    nome: combo?.nome || "",
    descricao: combo?.descricao || "",
    preco: combo?.preco || 0,
    imagemUrl: combo?.imagemUrl || "",
    servePessoas: combo?.servePessoas || 10,
    temaBolo: combo?.temaBolo || "",
    destaque: combo?.destaque || false,
    disponivel: combo?.disponivel ?? true,
  });

  const [itensInclusos, setItensInclusos] = useState<string[]>(itensInicial);

  const adicionarItem = () => {
    setItensInclusos([...itensInclusos, ""]);
  };

  const removerItem = (index: number) => {
    setItensInclusos(itensInclusos.filter((_, i) => i !== index));
  };

  const atualizarItem = (index: number, value: string) => {
    const novosItens = [...itensInclusos];
    novosItens[index] = value;
    setItensInclusos(novosItens);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Filtrar itens vazios e converter para JSON
      const itensFiltrados = itensInclusos.filter((item) => item.trim() !== "");
      if (itensFiltrados.length === 0) {
        setError("Adicione pelo menos um item incluso");
        setIsSubmitting(false);
        return;
      }

      const data = {
        ...formData,
        imagemUrl: formData.imagemUrl || null,
        temaBolo: formData.temaBolo || null,
        itensInclusos: JSON.stringify(itensFiltrados),
      };

      let result;
      if (combo) {
        result = await adminAtualizarCombo({ id: combo.id, ...data });
      } else {
        result = await adminCriarCombo(data);
      }

      if (result.success) {
        onSuccess?.();
        router.refresh();
        if (!combo) {
          setFormData({
            nome: "",
            descricao: "",
            preco: 0,
            imagemUrl: "",
            servePessoas: 10,
            temaBolo: "",
            destaque: false,
            disponivel: true,
          });
          setItensInclusos([""]);
        }
      } else {
        setError(result.error || "Erro ao salvar combo");
      }
    } catch (err) {
      setError("Erro inesperado ao salvar combo");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Nome do Combo"
          name="nome"
          value={formData.nome}
          onChange={(value) => setFormData({ ...formData, nome: value as string })}
          placeholder="Ex: Combo Festa Completa"
          required
        />

        <FormInput
          label="Tema do Bolo"
          name="temaBolo"
          value={formData.temaBolo}
          onChange={(value) => setFormData({ ...formData, temaBolo: value as string })}
          placeholder="Ex: Infantil, Casamento, Aniversário"
        />
      </div>

      <FormTextarea
        label="Descrição"
        name="descricao"
        value={formData.descricao}
        onChange={(value) => setFormData({ ...formData, descricao: value })}
        placeholder="Descreva o combo..."
        required
        rows={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Preço (R$)"
          name="preco"
          type="number"
          value={formData.preco}
          onChange={(value) => setFormData({ ...formData, preco: value as number })}
          step="0.01"
          min={0}
          required
        />

        <FormInput
          label="Serve Quantas Pessoas"
          name="servePessoas"
          type="number"
          value={formData.servePessoas}
          onChange={(value) => setFormData({ ...formData, servePessoas: value as number })}
          min={1}
          required
        />
      </div>

      <FormInput
        label="URL da Imagem"
        name="imagemUrl"
        type="url"
        value={formData.imagemUrl}
        onChange={(value) => setFormData({ ...formData, imagemUrl: value as string })}
        placeholder="https://exemplo.com/imagem.jpg"
      />

      {/* Itens Inclusos */}
      <div className="space-y-3">
        <label className="font-medium text-brand-chocolate flex items-center justify-between">
          <span>
            Itens Inclusos <span className="text-red-500">*</span>
          </span>
          <button
            type="button"
            onClick={adicionarItem}
            className="text-sm text-brand-mint hover:text-brand-mint-light font-medium"
          >
            + Adicionar Item
          </button>
        </label>

        <div className="space-y-2">
          {itensInclusos.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => atualizarItem(index, e.target.value)}
                placeholder={`Item ${index + 1}`}
                className="flex-1 px-4 py-3 border-2 border-brand-cream focus:border-brand-rose rounded-xl focus:outline-none"
              />
              {itensInclusos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removerItem(index)}
                  className="px-4 text-red-500 hover:text-red-600 font-medium"
                >
                  Remover
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <ToggleSwitch
          label="Produto em Destaque"
          enabled={formData.destaque}
          onChange={(value) => setFormData({ ...formData, destaque: value })}
        />

        <ToggleSwitch
          label="Disponível para Venda"
          enabled={formData.disponivel}
          onChange={(value) => setFormData({ ...formData, disponivel: value })}
        />
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn-secondary flex-1"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button type="submit" className="btn-primary flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : combo ? "Atualizar Combo" : "Criar Combo"}
        </button>
      </div>
    </form>
  );
}
