-- AlterTable
ALTER TABLE "optionToAcquire" ADD COLUMN     "installments" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startPayment" INTEGER NOT NULL DEFAULT 0;
