import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const presentId = 5;

  console.log("Atualizando presente, definindo disponivel para false.");
  const presenteAtualizado = await prisma.tabelaDePresentes.update({
    where: { id: presentId },
    data: { disponivel: true },
  });
  console.log("Presente atualizado.", presenteAtualizado);
  process.exit(0);
}

main().catch((e) => {
  console.error("Erro no script", e);
  process.exit(1);
});
