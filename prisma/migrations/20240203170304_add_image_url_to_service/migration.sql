/*
  Warnings:

  - Added the required column `imageUrl` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "service" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "rating" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(1,1) NOT NULL,
    "barbershopId" TEXT NOT NULL,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
