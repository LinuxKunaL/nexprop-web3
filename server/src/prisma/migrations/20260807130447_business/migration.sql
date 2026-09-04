-- CreateTable
CREATE TABLE "business" (
    "id" SERIAL NOT NULL,
    "businessName" TEXT NOT NULL,
    "businessType" TEXT NOT NULL,
    "businessAddress" TEXT NOT NULL,

    CONSTRAINT "business_pkey" PRIMARY KEY ("id")
);
