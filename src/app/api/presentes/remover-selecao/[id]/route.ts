import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function PATCH(req: Request, params: any) {
  try {
    const { id } = params;
    const presenteId = Number(id);
    console.log(presenteId);

    if (isNaN(presenteId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { id: presenteId },
    });

    if (!presente) {
      return NextResponse.json(
        { error: "Presente não encontrado" },
        { status: 404 }
      );
    }

    const convidado = await prisma.convidado.findFirst({
      where: { presenteId },
    });

    if (!convidado) {
      return NextResponse.json(
        { error: "Nenhum convidado está vinculado a este presente" },
        { status: 400 }
      );
    }

    await prisma.convidado.update({
      where: { id: convidado.id },
      data: { presenteId: null },
    });

    await prisma.tabelaDePresentes.update({
      where: { id: presenteId },
      data: { disponivel: true },
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
