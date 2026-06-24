-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "dateJoined" TIMESTAMP(3),
ADD COLUMN     "department" TEXT,
ADD COLUMN     "faculty" TEXT,
ADD COLUMN     "phoneNo" TEXT,
ADD COLUMN     "rank" TEXT;
