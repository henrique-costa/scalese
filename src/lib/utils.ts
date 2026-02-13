import { ZodError } from "zod";
import type { ApiResponse } from "./validations";

/**
 * Wrapper para server actions com tratamento padronizado de erros.
 * Garante que toda action retorne um ApiResponse consistente.
 */
export async function safeAction<T>(
  fn: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      const messages = error.errors.map((e) => e.message).join(", ");
      return { success: false, error: `Validação: ${messages}` };
    }

    if (error instanceof Error) {
      console.error(`[Action Error]: ${error.message}`, error.stack);
      return { success: false, error: error.message };
    }

    console.error("[Action Error]: Unknown error", error);
    return { success: false, error: "Erro interno do servidor" };
  }
}

/**
 * Sanitiza string removendo caracteres potencialmente perigosos.
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/<[^>]*>/g, "") // remove HTML tags
    .replace(/[^\w\s\-.,!?()áàãâéèêíìîóòõôúùûçÁÀÃÂÉÈÊÍÌÎÓÒÕÔÚÙÛÇ]/gi, "")
    .trim();
}

/**
 * Formata preço em BRL.
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
