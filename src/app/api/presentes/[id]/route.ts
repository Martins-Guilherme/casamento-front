import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

// DELETE - Remover presentes pelo ID
export async function DELETE(_: Request, params: any) {
  const id = Number(params.id);
  console.log(id);
  try {
    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { id },
    });
    if (!presente)
      return NextResponse.json(
        { error: "Presente não encontrado" },
        { status: 404 }
      );
    await prisma.convidado.updateMany({
      where: { presenteId: id },
      data: { presenteId: null },
    });

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
