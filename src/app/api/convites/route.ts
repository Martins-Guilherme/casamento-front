import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { nome, email, telefone, mensagem, presenteId } = await req.json();

    if (!nome || !email || !presenteId) {
      return NextResponse.json(
        { error: "Campos obrigatorios" },
        { status: 400 }
      );
    }

    const presenteJaEscolhido = await prisma.convidado.findFirst({
      where: { presenteId },
    });

    if (presenteJaEscolhido) {
      return NextResponse.json(
        { error: "PRESENTE_JA_ESCOLHIDO" },
        { status: 400 }
      );
    }

    // Gerar o token de acesso unico
    const token = crypto.randomBytes(10).toString("hex");

    // Criar convidado e marcar o presente como disponivel false
    const convidado = await prisma.$transaction([
      prisma.convidado.create({
        data: {
          nome,
          email,
          telefone,
          mensagem,
          token,
          usado: true,
          presente: { connect: { id: presenteId } },
        },
      }),
      prisma.tabelaDePresentes.update({
        where: { id: presenteId },
        data: { disponivel: false },
      }),
    ]);

    return NextResponse.json({
      message: "Convidado criado com sucesso",
      ...convidado,
      token,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Erro ao criar o convite" },
      { status: 500 }
    );
  }
}
