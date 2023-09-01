-- CreateTable
CREATE TABLE "Char" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "server" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Char_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Earning" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "belongTo" TEXT NOT NULL,

    CONSTRAINT "Earning_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Earning" ADD CONSTRAINT "Earning_belongTo_fkey" FOREIGN KEY ("belongTo") REFERENCES "Char"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
