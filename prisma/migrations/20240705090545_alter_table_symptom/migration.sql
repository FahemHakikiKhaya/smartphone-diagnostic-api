/*
  Warnings:

  - You are about to drop the column `description` on the `symptoms` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `symptoms` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `symptoms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `symptoms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `symptoms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "symptoms" DROP COLUMN "description",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "symptoms_code_key" ON "symptoms"("code");
