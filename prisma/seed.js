import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpando banco de dados...");
  await prisma.convidado.deleteMany();
  await prisma.tabelaDePresentes.deleteMany();

  console.log("🎁 Inserindo presentes de demonstração...");

  await prisma.tabelaDePresentes.createMany({
    data: [
      {
        nome: "Liquidificador Oster",
        descricao: "Perfeito para preparar sucos e vitaminas com amor!",
        imagem:
          "https://media.istockphoto.com/id/504046512/pt/foto/misturador-el%C3%A9trico-equipamento-de-aparelhos-de-cozinha-isolado-no-branco.webp?s=1024x1024&w=is&k=20&c=D-UylGZ07PvsEppYGS9sieLkhjj3wSMyvKqEmWOaKpo=",
      },
      {
        nome: "Jogo de Panelas Tramontina",
        descricao: "Essencial para o início da nova vida a dois.",
        imagem:
          "https://media.istockphoto.com/id/2177710322/pt/foto/new-modern-ai-high-technology-luxury-beautiful-electronic-product-design-grey-color-rice-and.webp?s=1024x1024&w=is&k=20&c=JyZ5_N9T2GUlth1qVRqVPrhAsi0ZMp06XXtOs0pI9RQ=",
      },
      {
        nome: "Edredom Queen Size",
        descricao: "Para noites aconchegantes e cheias de carinho.",
        imagem:
          "https://media.istockphoto.com/id/1388332535/pt/foto/bedroom.webp?s=1024x1024&w=is&k=20&c=Uqgi-oqgVi87w12orxjnaITbRusmOLSCh6D-xMyy-qY=",
      },
      {
        nome: "Cafeteira Expresso",
        descricao: "Para começar o dia com o aroma e o sabor do amor.",
        imagem:
          "https://images.unsplash.com/photo-1672209962122-4e38cd353163?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        nome: "Aparelho de Fondue",
        descricao: "Para noites românticas e deliciosas a dois.",
        imagem:
          "https://plus.unsplash.com/premium_photo-1664391816911-bfa64c860565?q=80&w=844&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  });

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
