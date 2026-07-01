-- CreateEnum
CREATE TYPE "PublicationType" AS ENUM ('JOURNAL_ARTICLE', 'CONFERENCE', 'BOOK', 'BOOK_CHAPTER');

-- CreateEnum
CREATE TYPE "QuartileRanking" AS ENUM ('Q1', 'Q2', 'Q3', 'OTHERS');

-- CreateEnum
CREATE TYPE "NonIndexed" AS ENUM ('UNIVERSITY_BASED', 'NON_UNIVERSITY_BASED');

-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('NATIONAL', 'INTERNATIONAL');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'UNDER_REVIEW', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fullCitation" TEXT NOT NULL,
    "publicationType" "PublicationType" NOT NULL,
    "quartileRanking" "QuartileRanking" NOT NULL,
    "nonIndexed" "NonIndexed",
    "classification" "Classification" NOT NULL,
    "filePath" TEXT,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "mimeType" TEXT,
    "status" "PublicationStatus" NOT NULL DEFAULT 'PENDING',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
