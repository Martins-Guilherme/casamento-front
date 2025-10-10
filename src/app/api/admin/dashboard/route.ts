import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";

export async function GET() {
  try {
    // Total de convidados que já selecionaram os presentes
    const totalConvidadosConfirmados = await prisma.convidado.count({
      where: { usado: true },
    });

    const totalPresentesDisponiveis = await prisma.tabelaDePresentes.count({
      where: { disponivel: true },
    });

    const totalPresentesCadastrados = await prisma.tabelaDePresentes.count();

    const totalPresentesSelecionados = await prisma.convidado.count({
      where: { presenteId: { not: null } },
    });

    const presentesPopulares = await prisma.convidado.groupBy({
      by: ["presenteId"],
      _count: { presenteId: true },
      orderBy: { _count: { presenteId: "desc" } },
      take: 5,
    });

    return NextResponse.json({
      totalConvidadosConfirmados,
      totalPresentesSelecionados,
      totalPresentesDisponiveis,
      totalPresentesCadastrados,
      presentesPopulares,
    });
  } catch (erro) {
    console.error(erro);
    return NextResponse.json(
      { erro: "Erro ao calcular e carregar os dados" },
      { status: 500 }
    );
  }
}
