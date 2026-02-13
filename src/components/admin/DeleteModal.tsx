"use client";

import { useEffect } from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  isDeleting?: boolean;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  isDeleting = false,
}: DeleteModalProps) {
  // Fechar modal com ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-elevated max-w-md w-full p-6 animate-fade-in-up">
        <div className="text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="font-display text-2xl font-bold text-brand-chocolate mb-3">
            Confirmar Exclusão
          </h3>
          <p className="text-brand-chocolate-light mb-6">
            Tem certeza que deseja excluir{" "}
            <span className="font-bold text-brand-chocolate">{itemName}</span>?
            Esta ação não pode ser desfeita.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 btn-secondary"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 bg-red-500 text-white font-body font-bold px-6 py-3 rounded-xl hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>
    </div>
  );
}
