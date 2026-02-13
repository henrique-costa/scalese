import { auth, currentUser } from "@clerk/nextjs/server";
import type { ApiResponse } from "./validations";

export async function requireAuth(): Promise<string> {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Não autorizado. Faça login para continuar.");
  }

  return userId;
}

export async function requireAdmin(): Promise<string> {
  const userId = await requireAuth();
  const user = await currentUser();

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  const role = (user.publicMetadata as { role?: string })?.role;

  if (role !== "admin") {
    throw new Error("Acesso negado. Permissão de administrador necessária.");
  }

  return userId;
}

export async function withAdmin<T>(
  fn: (userId: string) => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const userId = await requireAdmin();
    const data = await fn(userId);
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Erro de autorização" };
  }
}