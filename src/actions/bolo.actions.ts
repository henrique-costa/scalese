"use server";

import prisma from "@/lib/prisma";
import { safeAction } from "@/lib/utils";
import {
  BoloCreateSchema,
  BoloUpdateSchema,
  type BoloCreate,
  type BoloUpdate,
  type ApiResponse,
} from "@/lib/validations";
import type { Bolo } from "@prisma/client";

// ---- Listar todos os bolos ----
export async function listarBolos(
  apenasDisponiveis = false
): Promise<ApiResponse<Bolo[]>> {
  return safeAction(async () => {
    const where = apenasDisponiveis ? { disponivel: true } : {};
    const orderBy = apenasDisponiveis
      ? [{ destaque: "desc" as const }, { createdAt: "desc" as const }]
      : [{ createdAt: "desc" as const }];
    return prisma.bolo.findMany({ where, orderBy });
  });
}

// ---- Buscar bolo por ID ----
export async function buscarBolo(
  id: string
): Promise<ApiResponse<Bolo | null>> {
  return safeAction(async () => {
    const bolo = await prisma.bolo.findUnique({ where: { id } });
    if (!bolo) throw new Error("Bolo não encontrado");
    return bolo;
  });
}

// ---- Criar bolo ----
export async function criarBolo(
  data: BoloCreate
): Promise<ApiResponse<Bolo>> {
  return safeAction(async () => {
    const validated = BoloCreateSchema.parse(data);
    return prisma.bolo.create({ data: validated });
  });
}

// ---- Atualizar bolo ----
export async function atualizarBolo(
  data: BoloUpdate
): Promise<ApiResponse<Bolo>> {
  return safeAction(async () => {
    const { id, ...rest } = BoloUpdateSchema.parse(data);
    return prisma.bolo.update({ where: { id }, data: rest });
  });
}

// ---- Deletar bolo ----
export async function deletarBolo(
  id: string
): Promise<ApiResponse<Bolo>> {
  return safeAction(async () => {
    return prisma.bolo.delete({ where: { id } });
  });
}

// ---- Bolos em destaque ----
export async function bolosDestaque(): Promise<ApiResponse<Bolo[]>> {
  return safeAction(async () => {
    return prisma.bolo.findMany({
      where: { destaque: true, disponivel: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  });
}

// ---- Bolos por tamanho ----
export async function bolosPorTamanho(
  tamanho: "P" | "M" | "G" | "GG"
): Promise<ApiResponse<Bolo[]>> {
  return safeAction(async () => {
    return prisma.bolo.findMany({
      where: { tamanho, disponivel: true },
      orderBy: { preco: "asc" },
    });
  });
}
