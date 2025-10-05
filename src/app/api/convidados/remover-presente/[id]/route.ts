import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function PATCH(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const convidadoId = Number(params.id);

    // Verificar se o convidado existe;
    const convidado = await prisma.convidado.findUnique({
      where: { id: convidadoId },
    });

    // Se não encontrar o convidado exibir error
    if (!convidado) {
      return NextResponse.json(
        { error: "Convidado não encontrado" },
        { status: 404 }
      );
    }

    // Encontra presente vinculado a esse convidado
    const presente = await prisma.tabelaDePresentes.findUnique({
      where: { convidadoId },
    });
    // Verifica se o presente esta vinculado ao convidado
    if (!presente) {
      return NextResponse.json(
        {
          error: "Nenhum presente vinculado a este convidado",
        },
        { status: 400 }
      );
    }

    // Desvincula o presente do convidado
    await prisma.tabelaDePresentes.update({
      where: { id: presente.id },
      data: { convidadoId: null },
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
