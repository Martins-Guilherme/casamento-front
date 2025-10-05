import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

//  CRIAR PRESENTES
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nome, descricao, imagem } = data;
    if (!nome) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }
    const presente = await prisma.tabelaDePresentes.create({
      data: { nome, descricao, imagem },
    });
    return NextResponse.json(presente, { status: 201 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao tentar criar presente" },
      { status: 500 }
    );
  }
}

//  LISTAR PRESENTES
export async function GET() {
  try {
    const presentes = await prisma.tabelaDePresentes.findMany({
      include: { convidado: true },
    });
    return NextResponse.json(presentes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao listar presentes" },
      { status: 500 }
    );
  }
}
