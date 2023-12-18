/*
  Warnings:

  - You are about to drop the `BuyOption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BuyOption" DROP CONSTRAINT "BuyOption_carId_fkey";

-- DropTable
DROP TABLE "BuyOption";

-- CreateTable
CREATE TABLE "optionToAcquire" (
    "id" SERIAL NOT NULL,
    "carId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "financingTax" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "optionToAcquire_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "optionToAcquire" ADD CONSTRAINT "optionToAcquire_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
