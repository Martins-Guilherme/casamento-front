import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

//  CRIAR PRESENTES
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { nome, descricao, imagem, disponivel } = data;
    if (!nome) {
      return NextResponse.json(
        { error: "Nome é obrigatório" },
        { status: 400 }
      );
    }
    const presente = await prisma.tabelaDePresentes.create({
      data: { nome, descricao, imagem, disponivel },
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
    const presentesRaw = await prisma.tabelaDePresentes.findMany({
      orderBy: { id: "asc" },
      include: { convidados: true },
    });

    // Mapear para adicionar propriedade reservado (true se tiver convidado vinculado)
    const presentes = presentesRaw.map((p) => ({
      id: p.id,
      nome: p.nome,
      descricao: p.descricao,
      imagem: p.imagem,
      disponivel: p.disponivel,
      reservado: p.convidados.length > 0,
      escolhidoPor: p.convidados.length > 0 ? p.convidados[0].nome : null, // exemplo do primeiro convidado
    }));
    return NextResponse.json(presentes);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao listar presentes" },
      { status: 500 }
    );
  }
}
