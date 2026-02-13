"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImageUploadProps {
  currentUrl: string;
  onUpload: (url: string) => void;
}

export default function ImageUpload({ currentUrl, onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(currentUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview local imediato
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro no upload");
        setPreview(currentUrl);
        return;
      }

      setPreview(data.url);
      onUpload(data.url);
    } catch {
      setError("Erro ao fazer upload da imagem");
      setPreview(currentUrl);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block font-medium text-brand-chocolate">
        Imagem do Produto
      </label>

      {/* Preview */}
      {preview && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden bg-brand-cream-warm border-2 border-brand-cream">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex-1 px-4 py-3 border-2 border-dashed border-brand-gold rounded-xl text-brand-chocolate hover:bg-brand-cream-warm transition-colors text-sm font-medium"
        >
          {uploading ? "Enviando..." : preview ? "Trocar Imagem" : "Selecionar Imagem"}
        </button>

        {preview && (
          <button
            type="button"
            onClick={() => {
              setPreview("");
              onUpload("");
              if (fileInputRef.current) fileInputRef.current.value = "";
            }}
            className="px-4 py-3 text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Remover
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}

      <p className="text-xs text-brand-chocolate-light">
        JPG, PNG, WebP ou GIF. Max 4MB.
      </p>
    </div>
  );
}
