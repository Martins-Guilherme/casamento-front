import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function PATCH(req: Request, res: any) {
  const convidado = res.params;
  const convidadoId = Number(convidado.id);
  try {
    if (isNaN(convidadoId)) {
      return NextResponse.json({ error: "ID inválido" }, { status: 400 });
    }

    const convidado = await prisma.convidado.findUnique({
      where: { id: convidadoId },
    });

    if (!convidado) {
      return NextResponse.json(
        { error: "Convidado não encontrado" },
        { status: 404 }
      );
    }

    if (!convidado.presenteId) {
      return NextResponse.json(
        { error: "Nenhum presente vinculado a este convidado" },
        { status: 400 }
      );
    }

    await prisma.convidado.update({
      where: { id: convidadoId },
      data: { presenteId: null },
    });

    return NextResponse.json({ message: "Presente desvinculado com sucesso" });
  } catch (error) {
    console.error("Erro ao tentar desvincular presente", error);
    return NextResponse.json(
      { error: "Erro ao desvincular presente" },
      { status: 500 }
    );
  }
}
