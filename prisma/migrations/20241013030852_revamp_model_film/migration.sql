/*
  Warnings:

  - You are about to drop the column `thumbnail_Film` on the `Film` table. All the data in the column will be lost.
  - The `type` column on the `Film` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `thumbnail` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('Movie', 'TvSeries');

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_userId_fkey";

-- AlterTable
ALTER TABLE "Film" DROP COLUMN "thumbnail_Film",
ADD COLUMN     "thumbnail" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "ContentType" NOT NULL DEFAULT 'Movie';

-- DropTable
DROP TABLE "Movie";
