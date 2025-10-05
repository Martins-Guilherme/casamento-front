import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

// GET - Listar todos os convidados
export async function GET() {
  try {
    const convidados = await prisma.convidado.findMany({
      include: {
        presente: true, // inclui dados dos presentes escolhidos
      },
    });

    return NextResponse.json(convidados);
  } catch (error) {
    console.error("Erro ao tentar listar os convidados", error);
    return NextResponse.json(
      { error: "Erro ao listar convidados" },
      { status: 500 }
    );
  }
}
