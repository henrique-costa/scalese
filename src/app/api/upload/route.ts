import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const form = await request.formData();
  const file = form.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
  }

  // Validar tipo de arquivo
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipo de arquivo não permitido. Use JPG, PNG, WebP ou GIF." },
      { status: 400 }
    );
  }

  // Validar tamanho (máx 4MB)
  if (file.size > 4 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Arquivo muito grande. Máximo 4MB." },
      { status: 400 }
    );
  }

  // Upload para Vercel Blob
  const blob = await put(file.name, file, {
    access: "public",
  });

  return NextResponse.json({ url: blob.url });
}
