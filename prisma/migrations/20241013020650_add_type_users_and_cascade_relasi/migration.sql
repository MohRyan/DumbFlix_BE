-- CreateEnum
CREATE TYPE "typeUsers" AS ENUM ('Admin', 'User');

-- DropForeignKey
ALTER TABLE "Episode" DROP CONSTRAINT "Episode_filmId_fkey";

-- DropForeignKey
ALTER TABLE "Film" DROP CONSTRAINT "Film_userId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "typeUsers" "typeUsers" NOT NULL DEFAULT 'User';

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Film" ADD CONSTRAINT "Film_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Episode" ADD CONSTRAINT "Episode_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;
