"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import type { Bolo } from "@prisma/client";

interface BolosListProps {
  bolos: Bolo[];
}

const tamanhos = [
  { value: "todos", label: "Todos os Tamanhos" },
  { value: "P", label: "P (Pequeno)" },
  { value: "M", label: "M (Médio)" },
  { value: "G", label: "G (Grande)" },
  { value: "GG", label: "GG (Extra Grande)" },
];

export default function BolosList({ bolos }: BolosListProps) {
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("todos");

  const bolosFiltrados =
    tamanhoSelecionado === "todos"
      ? bolos
      : bolos.filter((bolo) => bolo.tamanho === tamanhoSelecionado);

  return (
    <>
      {/* Filtros */}
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {tamanhos.map((tamanho) => (
            <button
              key={tamanho.value}
              onClick={() => setTamanhoSelecionado(tamanho.value)}
              className={`px-6 py-3 rounded-xl font-body font-bold transition-all duration-300 ${
                tamanhoSelecionado === tamanho.value
                  ? "bg-brand-rose text-white shadow-card"
                  : "bg-white text-brand-chocolate border-2 border-brand-rose-light hover:border-brand-rose hover:bg-brand-rose-light/30"
              }`}
            >
              {tamanho.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      <div className="text-center mb-8">
        <p className="text-brand-chocolate-light">
          {bolosFiltrados.length}{" "}
          {bolosFiltrados.length === 1 ? "produto" : "produtos"}{" "}
          {bolosFiltrados.length === 1 ? "encontrado" : "encontrados"}
        </p>
      </div>

      {/* Grid */}
      {bolosFiltrados.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-brand-chocolate-light">
            Nenhum bolo encontrado neste tamanho.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bolosFiltrados.map((bolo) => (
            <ProductCard
              key={bolo.id}
              id={bolo.id}
              nome={bolo.nome}
              descricao={bolo.descricao}
              preco={bolo.preco}
              imagemUrl={bolo.imagemUrl}
              sabor={bolo.sabor}
              destaque={bolo.destaque}
              badge={`${bolo.tamanho} · ${bolo.porcoes} porções`}
              productType="BOLO"
            />
          ))}
        </div>
      )}
    </>
  );
}
