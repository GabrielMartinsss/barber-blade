/*
  Warnings:

  - You are about to alter the column `value` on the `rating` table. The data in that column could be lost. The data in that column will be cast from `Decimal(1,1)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "rating" ALTER COLUMN "value" SET DATA TYPE INTEGER;
