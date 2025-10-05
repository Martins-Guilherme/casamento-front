import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

// DELETE - Remover presentes pelo ID
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const presente = await prisma.tabelaDePresentes.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json(presente);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    NextResponse.json({ error: "Erro ao excluir presente" }, { status: 500 });
  }
}
