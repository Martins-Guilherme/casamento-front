/*
  Warnings:

  - You are about to drop the column `convidadoId` on the `TabelaDePresentes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[presenteId]` on the table `Convidado` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."TabelaDePresentes" DROP CONSTRAINT "TabelaDePresentes_convidadoId_fkey";

-- DropIndex
DROP INDEX "public"."TabelaDePresentes_convidadoId_key";

-- AlterTable
ALTER TABLE "Convidado" ADD COLUMN     "presenteId" INTEGER;

-- AlterTable
ALTER TABLE "TabelaDePresentes" DROP COLUMN "convidadoId";

-- CreateIndex
CREATE UNIQUE INDEX "Convidado_presenteId_key" ON "Convidado"("presenteId");

-- AddForeignKey
ALTER TABLE "Convidado" ADD CONSTRAINT "Convidado_presenteId_fkey" FOREIGN KEY ("presenteId") REFERENCES "TabelaDePresentes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
