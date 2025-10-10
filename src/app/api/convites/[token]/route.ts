import { NextResponse } from "next/server";
import { validateToken } from "@/app/_lib/validateToken";

export async function GET(
  req: Request,
  context: Promise<{ params: { token: string } }>
) {
  const { params } = await context;
  const { token } = params;

  try {
    const convidado = await validateToken(token);

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
