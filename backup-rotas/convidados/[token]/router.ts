import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { token: string } }
) {
  const { token } = params;

  if (!token) {
    return NextResponse.json({ error: "Token não fornecido" }, { status: 400 });
  }

  try {
    const convidado = await prisma.convidado.findUnique({
      where: { token },
      include: { presente: true },
    });

    if (!convidado) {
      return NextResponse.json({ error: "Token inválido" }, { status: 404 });
    }

    return NextResponse.json({ convidado });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao buscar convidado" },
      { status: 500 }
    );
  }
}
