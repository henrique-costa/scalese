"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import FormSelect from "./FormSelect";
import ToggleSwitch from "./ToggleSwitch";
import { adminCriarBolo, adminAtualizarBolo } from "@/actions";
import type { Bolo } from "@prisma/client";

interface BoloFormProps {
  bolo?: Bolo;
  onSuccess?: () => void;
}

export default function BoloForm({ bolo, onSuccess }: BoloFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    nome: bolo?.nome || "",
    descricao: bolo?.descricao || "",
    preco: bolo?.preco || 0,
    imagemUrl: bolo?.imagemUrl || "",
    sabor: bolo?.sabor || "",
    tamanho: bolo?.tamanho || "M",
    porcoes: bolo?.porcoes || 10,
    personalizado: bolo?.personalizado || false,
    destaque: bolo?.destaque || false,
    disponivel: bolo?.disponivel ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = {
        ...formData,
        imagemUrl: formData.imagemUrl || null,
      };

      let result;
      if (bolo) {
        result = await adminAtualizarBolo({ id: bolo.id, ...data });
      } else {
        result = await adminCriarBolo(data);
      }

      if (result.success) {
        onSuccess?.();
        router.refresh();
        if (!bolo) {
          setFormData({
            nome: "",
            descricao: "",
            preco: 0,
            imagemUrl: "",
            sabor: "",
            tamanho: "M",
            porcoes: 10,
            personalizado: false,
            destaque: false,
            disponivel: true,
          });
        }
      } else {
        setError(result.error || "Erro ao salvar bolo");
      }
    } catch (err) {
      setError("Erro inesperado ao salvar bolo");
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
          label="Nome do Bolo"
          name="nome"
          value={formData.nome}
          onChange={(value) => setFormData({ ...formData, nome: value as string })}
          placeholder="Ex: Bolo de Chocolate Rosa"
          required
        />

        <FormInput
          label="Sabor"
          name="sabor"
          value={formData.sabor}
          onChange={(value) => setFormData({ ...formData, sabor: value as string })}
          placeholder="Ex: Chocolate com Morango"
          required
        />
      </div>

      <FormTextarea
        label="Descrição"
        name="descricao"
        value={formData.descricao}
        onChange={(value) => setFormData({ ...formData, descricao: value })}
        placeholder="Descreva o produto..."
        required
        rows={3}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

        <FormSelect
          label="Tamanho"
          name="tamanho"
          value={formData.tamanho}
          onChange={(value) => setFormData({ ...formData, tamanho: value })}
          options={[
            { value: "P", label: "P - Pequeno" },
            { value: "M", label: "M - Médio" },
            { value: "G", label: "G - Grande" },
            { value: "GG", label: "GG - Extra Grande" },
          ]}
          required
        />

        <FormInput
          label="Porções"
          name="porcoes"
          type="number"
          value={formData.porcoes}
          onChange={(value) => setFormData({ ...formData, porcoes: value as number })}
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

      <div className="flex flex-wrap gap-6">
        <ToggleSwitch
          label="Aceita Personalização"
          enabled={formData.personalizado}
          onChange={(value) => setFormData({ ...formData, personalizado: value })}
        />

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
          {isSubmitting ? "Salvando..." : bolo ? "Atualizar Bolo" : "Criar Bolo"}
        </button>
      </div>
    </form>
  );
}
