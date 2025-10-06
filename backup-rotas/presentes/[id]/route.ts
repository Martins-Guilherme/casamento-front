import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import fs from "fs";
import path from "path";

// DELETE - Remover presentes pelo ID
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  try {
    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { id },
    });
    if (!presente)
      return NextResponse.json(
        { error: "Presente não encontrado" },
        { status: 404 }
      );

    // se imagem apontar para /presentes/xxx, remove arquivo
    if (presente.imagem && presente.imagem.startsWith("/presentes/")) {
      const filePath = path.join(
        process.cwd(),
        "public",
        presente.imagem.replace(/^\/+/, "")
      );
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (e) {
        console.warn("Erro ao remover arquivo:", e);
      }
    }

    await prisma.tabelaDePresentes.delete({ where: { id } });
    return NextResponse.json({ message: "Presente removido" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao excluir presente" },
      { status: 500 }
    );
  }
}
