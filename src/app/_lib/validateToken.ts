import { prisma } from "@/app/_lib/prisma";

/**
 * Valida um token de convite e retorna os dados do convidado caso seja válido.
 * @param token string do token a validar
 * @returns Promise<object|null> Dados do convidado ou null se não existir
 *
 */

export async function validateToken(token: string) {
  if (!token || typeof token !== "string" || token.trim() === "") {
    throw new Error("Token inválido ou inexistente.");
  }

  const convidado = await prisma.convidado.findUnique({
    where: { token },
    include: { presente: true },
  });

  return convidado;
}
