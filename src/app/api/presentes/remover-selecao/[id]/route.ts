import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } }
) {
  const presenteId = Number(params.id);
  if (Number.isNaN(presenteId)) {
    return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  }

  try {
    // garante que o presente exista
    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { id: presenteId },
    });
    if (!presente)
      return NextResponse.json(
        { error: "Presente não encontrado" },
        { status: 404 }
      );

    // Encontra o convidado que está vinculado a este presente
    const convidado = await prisma.convidado.findFirst({
      where: { presenteId },
    });
    if (!convidado) {
      return NextResponse.json(
        { error: "Nenhum convidado está vinculado a este presente" },
        { status: 400 }
      );
    }

    // Remover o vinculo do convidado com o presente
    await prisma.convidado.update({
      where: { id: convidado.id },
      data: { presenteId: null },
    });

    return NextResponse.json({ message: "Seleção removida com sucesso" });
  } catch (error) {
    console.error("Erro ao remover seleção:", error);
    return NextResponse.json(
      { error: "Erro ao remover seleção" },
      { status: 500 }
    );
  }
}
