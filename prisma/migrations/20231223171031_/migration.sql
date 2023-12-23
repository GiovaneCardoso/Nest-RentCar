/*
  Warnings:

  - You are about to drop the `optionToAcquire` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "optionToAcquire" DROP CONSTRAINT "optionToAcquire_carId_fkey";

-- DropTable
DROP TABLE "optionToAcquire";

-- CreateTable
CREATE TABLE "OptionToAcquire" (
    "id" SERIAL NOT NULL,
    "carId" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "value" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL DEFAULT 0,
    "startPayment" INTEGER NOT NULL DEFAULT 0,
    "financingTax" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OptionToAcquire_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OptionToAcquire" ADD CONSTRAINT "OptionToAcquire_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
