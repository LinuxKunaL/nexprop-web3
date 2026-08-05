-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "walletName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nonce" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_address_key" ON "user"("address");
