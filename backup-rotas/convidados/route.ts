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

export async function POST(req: Request) {
  const { nome, email, presenteId } = await req.json();

  // Verifica se o presente ainda está disponível
  const presente = await prisma.tabelaDePresentes.findUnique({
    where: { id: presenteId },
  });

  console.log(presente);

  if (!presente || !presente.disponivel) {
    return NextResponse.json(
      { error: "Esse presente já foi escolhido por outro convidado." },
      { status: 400 }
    );
  }

  // Cria convidado e bloqueia presente na mesma transação
  const token = Math.random().toString(36).substring(2, 10);

  const [convidado] = await prisma.$transaction([
    prisma.convidado.create({
      data: {
        nome,
        email,
        token,
        presente: { connect: { id: presenteId } },
      },
    }),
    prisma.tabelaDePresentes.update({
      where: { id: presenteId },
      data: { disponivel: false },
    }),
  ]);

  return NextResponse.json({ token: convidado.token });
}
