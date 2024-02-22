/*
  Warnings:

  - Added the required column `telephone` to the `barbershop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "barbershop" ADD COLUMN     "description" TEXT,
ADD COLUMN     "telephone" TEXT NOT NULL;
