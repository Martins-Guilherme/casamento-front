import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpando banco de dados...");
  await prisma.convidado.deleteMany();
  await prisma.tabelaDePresentes.deleteMany();

  await prisma.evento.create({
    data: {
      titulo: "Nosso Casamento",
      data: new Date("2025-10-25T15:00:00Z"),
      local: "Igreja Matriz, Centro, Cidade",
      descricao: "Venha celebrar conosco este dia tão especial!",
      imagem:
        "https://res.cloudinary.com/djsxenm2q/image/upload/v1760318046/lxicjya5y4zni4xrymsy.jpg",
    },
  });

  console.log("✅ Presentes criados com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
