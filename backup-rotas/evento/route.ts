import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

//  CRIAR OU ATUALIZAR EVENTO
export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { titulo, data: dateStr, local, descricao } = data;
    const dataEvento = new Date(dateStr);

    // Validar dados básicos
    if (!titulo || !dataEvento || !local) {
      return NextResponse.json(
        { error: "Campos obrigatórios" },
        { status: 400 }
      );
    }

    // Atualiza evento existente ou cria se não existir (exemplo: id 1)
    const evento = await prisma.evento.upsert({
      where: { id: 1 },
      update: { titulo, data: dataEvento, local, descricao },
      create: { id: 1, titulo, data: dataEvento, local, descricao },
    });
    return NextResponse.json(evento);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao salvar o evento" },
      { status: 500 }
    );
  }
}

// Obter dados do evento
export async function GET() {
  try {
    const evento = await prisma.evento.findUnique({
      where: { id: 1 },
    });
    return NextResponse.json(evento);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Erro ao carregar o evento" },
      { status: 500 }
    );
  }
}
