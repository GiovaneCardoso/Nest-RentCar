-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "totalValue" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuyOption" (
    "id" SERIAL NOT NULL,
    "carId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "startPayment" INTEGER NOT NULL,
    "installments" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "BuyOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BuyOption" ADD CONSTRAINT "BuyOption_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
