/*
  Warnings:

  - You are about to drop the column `user_id` on the `user_answers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_answers" DROP CONSTRAINT "user_answers_user_id_fkey";

-- AlterTable
ALTER TABLE "user_answers" DROP COLUMN "user_id";
