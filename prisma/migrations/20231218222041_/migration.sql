/*
  Warnings:

  - You are about to drop the column `installments` on the `BuyOption` table. All the data in the column will be lost.
  - You are about to drop the column `startPayment` on the `BuyOption` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BuyOption" DROP COLUMN "installments",
DROP COLUMN "startPayment",
ADD COLUMN     "financingTax" INTEGER NOT NULL DEFAULT 0;
