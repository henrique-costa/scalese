"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import ToggleSwitch from "./ToggleSwitch";
import ImageUpload from "./ImageUpload";
import { adminCriarBombom, adminAtualizarBombom } from "@/actions";
import type { Bombom } from "@prisma/client";

interface BombomFormProps {
  bombom?: Bombom; // Se fornecido, é edição; senão, é criação
  onSuccess?: () => void;
}

export default function BombomForm({ bombom, onSuccess }: BombomFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Estado do formulário
  const [formData, setFormData] = useState({
    nome: bombom?.nome || "",
    descricao: bombom?.descricao || "",
    preco: bombom?.preco || 0,
    imagemUrl: bombom?.imagemUrl || "",
    sabor: bombom?.sabor || "",
    peso: bombom?.peso || 50,
    unidades: bombom?.unidades || 1,
    destaque: bombom?.destaque || false,
    disponivel: bombom?.disponivel ?? true,
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
      if (bombom) {
        // Edição
        result = await adminAtualizarBombom({ id: bombom.id, ...data });
      } else {
        // Criação
        result = await adminCriarBombom(data);
      }

      if (result.success) {
        onSuccess?.();
        router.refresh();
        if (!bombom) {
          // Limpar form após criar
          setFormData({
            nome: "",
            descricao: "",
            preco: 0,
            imagemUrl: "",
            sabor: "",
            peso: 50,
            unidades: 1,
            destaque: false,
            disponivel: true,
          });
        }
      } else {
        setError(result.error || "Erro ao salvar bombom");
      }
    } catch (err) {
      setError("Erro inesperado ao salvar bombom");
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
          label="Nome do Bombom"
          name="nome"
          value={formData.nome}
          onChange={(value) =>
            setFormData({ ...formData, nome: value as string })
          }
          placeholder="Ex: Brigadeiro Gourmet"
          required
        />

        <FormInput
          label="Sabor"
          name="sabor"
          value={formData.sabor}
          onChange={(value) =>
            setFormData({ ...formData, sabor: value as string })
          }
          placeholder="Ex: Chocolate Belga"
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
          onChange={(value) =>
            setFormData({ ...formData, preco: value as number })
          }
          step="0.01"
          min={0}
          required
        />

        <FormInput
          label="Peso (g)"
          name="peso"
          type="number"
          value={formData.peso}
          onChange={(value) =>
            setFormData({ ...formData, peso: value as number })
          }
          min={1}
          required
        />

        <FormInput
          label="Unidades"
          name="unidades"
          type="number"
          value={formData.unidades}
          onChange={(value) =>
            setFormData({ ...formData, unidades: value as number })
          }
          min={1}
          required
        />
      </div>

      <ImageUpload
        currentUrl={formData.imagemUrl}
        onUpload={(url) => setFormData({ ...formData, imagemUrl: url })}
      />

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
        <button
          type="submit"
          className="btn-primary flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Salvando..."
            : bombom
            ? "Atualizar Bombom"
            : "Criar Bombom"}
        </button>
      </div>
    </form>
  );
}
