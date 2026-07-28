/*
  Warnings:

  - The values [APPROVED,REJECTED,PUBLISHED] on the enum `PublicationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PublicationStatus_new" AS ENUM ('PENDING', 'UNDER_REVIEW', 'SCORED');
ALTER TABLE "public"."Publication" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Publication" ALTER COLUMN "status" TYPE "PublicationStatus_new" USING ("status"::text::"PublicationStatus_new");
ALTER TYPE "PublicationStatus" RENAME TO "PublicationStatus_old";
ALTER TYPE "PublicationStatus_new" RENAME TO "PublicationStatus";
DROP TYPE "public"."PublicationStatus_old";
ALTER TABLE "Publication" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
