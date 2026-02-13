"use server";

import prisma from "@/lib/prisma";
import { safeAction } from "@/lib/utils";
import {
  BombomCreateSchema,
  BombomUpdateSchema,
  type BombomCreate,
  type BombomUpdate,
  type ApiResponse,
} from "@/lib/validations";
import type { Bombom } from "@prisma/client";

// ---- Listar todos os bombons ----
export async function listarBombons(
  apenasDisponiveis = false
): Promise<ApiResponse<Bombom[]>> {
  return safeAction(async () => {
    const where = apenasDisponiveis ? { disponivel: true } : {};
    return prisma.bombom.findMany({
      where,
      orderBy: [{ destaque: "desc" }, { createdAt: "desc" }],
    });
  });
}

// ---- Buscar bombom por ID ----
export async function buscarBombom(
  id: string
): Promise<ApiResponse<Bombom | null>> {
  return safeAction(async () => {
    const bombom = await prisma.bombom.findUnique({ where: { id } });
    if (!bombom) throw new Error("Bombom não encontrado");
    return bombom;
  });
}

// ---- Criar bombom ----
export async function criarBombom(
  data: BombomCreate
): Promise<ApiResponse<Bombom>> {
  return safeAction(async () => {
    const validated = BombomCreateSchema.parse(data);
    return prisma.bombom.create({ data: validated });
  });
}

// ---- Atualizar bombom ----
export async function atualizarBombom(
  data: BombomUpdate
): Promise<ApiResponse<Bombom>> {
  return safeAction(async () => {
    const { id, ...rest } = BombomUpdateSchema.parse(data);
    return prisma.bombom.update({ where: { id }, data: rest });
  });
}

// ---- Deletar bombom ----
export async function deletarBombom(
  id: string
): Promise<ApiResponse<Bombom>> {
  return safeAction(async () => {
    return prisma.bombom.delete({ where: { id } });
  });
}

// ---- Buscar bombons em destaque ----
export async function bombonsDestaque(): Promise<ApiResponse<Bombom[]>> {
  return safeAction(async () => {
    return prisma.bombom.findMany({
      where: { destaque: true, disponivel: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  });
}
