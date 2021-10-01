-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('OUT', 'IN', 'SELF');

-- CreateEnum
CREATE TYPE "PaymentGateStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateTable
CREATE TABLE "PaymentGateOwner" (
    "id" SERIAL NOT NULL,
    "githubId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaymentGateOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentGate" (
    "id" SERIAL NOT NULL,
    "widgetToken" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "PaymentGateStatus" NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "PaymentGate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "to" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "paymentGateId" INTEGER NOT NULL,
    "gasUsed" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentGateOwner_githubId_key" ON "PaymentGateOwner"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentGate_widgetToken_key" ON "PaymentGate"("widgetToken");

-- AddForeignKey
ALTER TABLE "PaymentGate" ADD CONSTRAINT "PaymentGate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "PaymentGateOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_paymentGateId_fkey" FOREIGN KEY ("paymentGateId") REFERENCES "PaymentGate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
