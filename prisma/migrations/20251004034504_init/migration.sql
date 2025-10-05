-- CreateTable
CREATE TABLE "Convidado" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "mensagem" TEXT,
    "token" TEXT,
    "usado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Convidado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TabelaDePresentes" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "imagem" TEXT,
    "descricao" TEXT,
    "convidadoId" INTEGER,

    CONSTRAINT "TabelaDePresentes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Convidado_email_key" ON "Convidado"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Convidado_token_key" ON "Convidado"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TabelaDePresentes_convidadoId_key" ON "TabelaDePresentes"("convidadoId");

-- AddForeignKey
ALTER TABLE "TabelaDePresentes" ADD CONSTRAINT "TabelaDePresentes_convidadoId_fkey" FOREIGN KEY ("convidadoId") REFERENCES "Convidado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
