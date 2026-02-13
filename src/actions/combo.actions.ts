"use server";

import prisma from "@/lib/prisma";
import { safeAction } from "@/lib/utils";
import {
  ComboFestaCreateSchema,
  ComboFestaUpdateSchema,
  type ComboFestaCreate,
  type ComboFestaUpdate,
  type ApiResponse,
} from "@/lib/validations";
import type { ComboFesta } from "@prisma/client";

// ---- Listar todos os combos ----
export async function listarCombos(
  apenasDisponiveis = false
): Promise<ApiResponse<ComboFesta[]>> {
  return safeAction(async () => {
    const where = apenasDisponiveis ? { disponivel: true } : {};
    return prisma.comboFesta.findMany({
      where,
      orderBy: [{ destaque: "desc" }, { servePessoas: "asc" }],
    });
  });
}

// ---- Buscar combo por ID ----
export async function buscarCombo(
  id: string
): Promise<ApiResponse<ComboFesta | null>> {
  return safeAction(async () => {
    const combo = await prisma.comboFesta.findUnique({ where: { id } });
    if (!combo) throw new Error("Combo Festa não encontrado");
    return combo;
  });
}

// ---- Criar combo ----
export async function criarCombo(
  data: ComboFestaCreate
): Promise<ApiResponse<ComboFesta>> {
  return safeAction(async () => {
    const validated = ComboFestaCreateSchema.parse(data);
    return prisma.comboFesta.create({ data: validated });
  });
}

// ---- Atualizar combo ----
export async function atualizarCombo(
  data: ComboFestaUpdate
): Promise<ApiResponse<ComboFesta>> {
  return safeAction(async () => {
    const { id, ...rest } = ComboFestaUpdateSchema.parse(data);
    return prisma.comboFesta.update({ where: { id }, data: rest });
  });
}

// ---- Deletar combo ----
export async function deletarCombo(
  id: string
): Promise<ApiResponse<ComboFesta>> {
  return safeAction(async () => {
    return prisma.comboFesta.delete({ where: { id } });
  });
}

// ---- Combos em destaque ----
export async function combosDestaque(): Promise<ApiResponse<ComboFesta[]>> {
  return safeAction(async () => {
    return prisma.comboFesta.findMany({
      where: { destaque: true, disponivel: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    });
  });
}

// ---- Combos por número de pessoas ----
export async function combosPorPessoas(
  minPessoas: number
): Promise<ApiResponse<ComboFesta[]>> {
  return safeAction(async () => {
    return prisma.comboFesta.findMany({
      where: {
        servePessoas: { gte: minPessoas },
        disponivel: true,
      },
      orderBy: { servePessoas: "asc" },
    });
  });
}
