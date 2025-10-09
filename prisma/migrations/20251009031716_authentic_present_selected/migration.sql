/*
  Warnings:

  - Made the column `disponivel` on table `TabelaDePresentes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TabelaDePresentes" ALTER COLUMN "disponivel" SET NOT NULL;
