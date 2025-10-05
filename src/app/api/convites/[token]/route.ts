import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  try {
    const convidado = await prisma.convidado.findUnique({
      where: { token: params.token },
      include: { presente: true },
    });

    if (!convidado) {
      return NextResponse.json(
        { error: "Convite não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: convidado.id,
      nome: convidado.nome,
      email: convidado.email,
      presente: convidado.presente,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar convite." },
      { status: 500 }
    );
  }
}
