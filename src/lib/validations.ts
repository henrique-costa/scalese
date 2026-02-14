import { z } from "zod";

// =============================================
// Schemas de Validação - Confetteria Scalese
// =============================================

// ---- Bombom ----
export const BombomCreateSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  descricao: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  preco: z
    .number()
    .positive("Preço deve ser positivo")
    .max(10000, "Preço máximo excedido"),
  imagemUrl: z.string().url("URL inválida").optional().nullable(),
  sabor: z.string().min(2, "Sabor é obrigatório"),
  peso: z.number().int().positive("Peso deve ser positivo"),
  unidades: z.number().int().positive().default(1),
  destaque: z.boolean().default(false),
  disponivel: z.boolean().default(true),
});

export const BombomUpdateSchema = BombomCreateSchema.partial().extend({
  id: z.string().cuid(),
});

// ---- Bolo ----
export const BoloCreateSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  descricao: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  preco: z
    .number()
    .positive("Preço deve ser positivo")
    .max(50000, "Preço máximo excedido"),
  imagemUrl: z.string().url("URL inválida").optional().nullable(),
  sabor: z.string().min(2, "Sabor é obrigatório"),
  tamanho: z.enum(["P", "M", "G", "GG"], {
    errorMap: () => ({ message: "Tamanho inválido. Use: P, M, G ou GG" }),
  }),
  porcoes: z.number().int().positive("Porções deve ser positivo"),
  personalizado: z.boolean().default(false),
  destaque: z.boolean().default(false),
  disponivel: z.boolean().default(true),
});

export const BoloUpdateSchema = BoloCreateSchema.partial().extend({
  id: z.string().cuid(),
});

// ---- Combo Festa ----
export const ComboFestaCreateSchema = z.object({
  nome: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  descricao: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  preco: z
    .number()
    .positive("Preço deve ser positivo")
    .max(100000, "Preço máximo excedido"),
  imagemUrl: z.string().url("URL inválida").optional().nullable(),
  itensInclusos: z
    .string()
    .min(5, "Itens inclusos é obrigatório"),
  servePessoas: z.number().int().positive("Quantidade de pessoas deve ser positiva"),
  temaBolo: z.string().optional().nullable(),
  destaque: z.boolean().default(false),
  disponivel: z.boolean().default(true),
});

export const ComboFestaUpdateSchema = ComboFestaCreateSchema.partial().extend({
  id: z.string().cuid(),
});

// ---- Carrinho ----
export const ProductTypeEnum = z.enum(["BOMBOM", "BOLO", "COMBO"]);

export const AddToCartSchema = z.object({
  productId: z.string().cuid(),
  productType: ProductTypeEnum,
  quantity: z.number().int().positive().default(1),
});

export const UpdateCartItemSchema = z.object({
  itemId: z.string().cuid(),
  quantity: z.number().int().positive("Quantidade deve ser positiva"),
});

export const RemoveCartItemSchema = z.object({
  itemId: z.string().cuid(),
});

export type AddToCartInput = z.infer<typeof AddToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof UpdateCartItemSchema>;
export type RemoveCartItemInput = z.infer<typeof RemoveCartItemSchema>;

// ---- Tipos inferidos ----
export type BombomCreate = z.infer<typeof BombomCreateSchema>;
export type BombomUpdate = z.infer<typeof BombomUpdateSchema>;
export type BoloCreate = z.infer<typeof BoloCreateSchema>;
export type BoloUpdate = z.infer<typeof BoloUpdateSchema>;
export type ComboFestaCreate = z.infer<typeof ComboFestaCreateSchema>;
export type ComboFestaUpdate = z.infer<typeof ComboFestaUpdateSchema>;

// ---- Schema de resposta padronizada ----
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.any().optional(),
  error: z.string().optional(),
  message: z.string().optional(),
});

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};
