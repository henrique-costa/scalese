"use server";

import prisma from "@/lib/prisma";
import { withAdmin } from "@/lib/auth";
import {
  BombomCreateSchema,
  BombomUpdateSchema,
  BoloCreateSchema,
  BoloUpdateSchema,
  ComboFestaCreateSchema,
  ComboFestaUpdateSchema,
  type BombomCreate,
  type BombomUpdate,
  type BoloCreate,
  type BoloUpdate,
  type ComboFestaCreate,
  type ComboFestaUpdate,
  type ApiResponse,
} from "@/lib/validations";
import type { Bombom, Bolo, ComboFesta } from "@prisma/client";

// =============================================
// Admin Actions - Protegidas com Clerk
// =============================================
// Todas as operações de escrita passam por withAdmin()
// que verifica autenticação + role "admin" no Clerk.

// ---- BOMBONS (Admin) ----

export async function adminCriarBombom(
  data: BombomCreate
): Promise<ApiResponse<Bombom>> {
  return withAdmin(async () => {
    const validated = BombomCreateSchema.parse(data);
    return prisma.bombom.create({ data: validated });
  });
}

export async function adminAtualizarBombom(
  data: BombomUpdate
): Promise<ApiResponse<Bombom>> {
  return withAdmin(async () => {
    const { id, ...rest } = BombomUpdateSchema.parse(data);
    return prisma.bombom.update({ where: { id }, data: rest });
  });
}

export async function adminDeletarBombom(
  id: string
): Promise<ApiResponse<Bombom>> {
  return withAdmin(async () => {
    return prisma.bombom.delete({ where: { id } });
  });
}

// ---- BOLOS (Admin) ----

export async function adminCriarBolo(
  data: BoloCreate
): Promise<ApiResponse<Bolo>> {
  return withAdmin(async () => {
    const validated = BoloCreateSchema.parse(data);
    return prisma.bolo.create({ data: validated });
  });
}

export async function adminAtualizarBolo(
  data: BoloUpdate
): Promise<ApiResponse<Bolo>> {
  return withAdmin(async () => {
    const { id, ...rest } = BoloUpdateSchema.parse(data);
    return prisma.bolo.update({ where: { id }, data: rest });
  });
}

export async function adminDeletarBolo(
  id: string
): Promise<ApiResponse<Bolo>> {
  return withAdmin(async () => {
    return prisma.bolo.delete({ where: { id } });
  });
}

// ---- COMBOS FESTA (Admin) ----

export async function adminCriarCombo(
  data: ComboFestaCreate
): Promise<ApiResponse<ComboFesta>> {
  return withAdmin(async () => {
    const validated = ComboFestaCreateSchema.parse(data);
    return prisma.comboFesta.create({ data: validated });
  });
}

export async function adminAtualizarCombo(
  data: ComboFestaUpdate
): Promise<ApiResponse<ComboFesta>> {
  return withAdmin(async () => {
    const { id, ...rest } = ComboFestaUpdateSchema.parse(data);
    return prisma.comboFesta.update({ where: { id }, data: rest });
  });
}

export async function adminDeletarCombo(
  id: string
): Promise<ApiResponse<ComboFesta>> {
  return withAdmin(async () => {
    return prisma.comboFesta.delete({ where: { id } });
  });
}
