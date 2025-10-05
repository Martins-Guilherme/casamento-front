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
    // garante que presente existe
    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { id: presenteId },
    });
    if (!presente)
      return NextResponse.json(
        { error: "Presente não encontrado" },
        { status: 404 }
      );

    await prisma.tabelaDePresentes.update({
      where: { id: presenteId },
      data: { convidadoId: null },
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
