/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `diagnoses` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `diagnoses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "diagnoses" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "diagnoses_code_key" ON "diagnoses"("code");
