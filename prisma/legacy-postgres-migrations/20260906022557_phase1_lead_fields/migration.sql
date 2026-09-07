-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'VENDOR_CHECKING', 'QUOTE_SENT', 'CUSTOMER_ACCEPTED', 'CONVERTED', 'LOST', 'CANCELLED');

-- CreateEnum
CREATE TYPE "TripType" AS ENUM ('ONE_WAY', 'ROUND_TRIP', 'AIRPORT');

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "dropLocation" TEXT NOT NULL,
    "journeyDate" TEXT NOT NULL,
    "pickupTime" TEXT NOT NULL,
    "returnDate" DATE,
    "returnTime" TEXT,
    "passengers" INTEGER NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "tripType" "TripType" NOT NULL DEFAULT 'ONE_WAY',
    "luggage" TEXT,
    "routeSlug" TEXT,
    "customerName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "email" TEXT,
    "additionalNotes" TEXT,
    "source" TEXT,
    "medium" TEXT,
    "campaign" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "landingPage" TEXT,
    "referrer" TEXT,
    "status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "notes" TEXT,
    "whatsappClickedAt" TIMESTAMP(3),
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_reference_key" ON "Lead"("reference");

-- CreateIndex
CREATE INDEX "Lead_phoneNumber_createdAt_idx" ON "Lead"("phoneNumber", "createdAt");

-- CreateIndex
CREATE INDEX "Lead_status_createdAt_idx" ON "Lead"("status", "createdAt");
