/*
  Warnings:

  - You are about to drop the `DiagnoseSymptom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Diagnosis` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Symptom` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserResultCertainty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiagnoseSymptom" DROP CONSTRAINT "DiagnoseSymptom_diagnoseId_fkey";

-- DropForeignKey
ALTER TABLE "DiagnoseSymptom" DROP CONSTRAINT "DiagnoseSymptom_symptomId_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_symptomId_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserResult" DROP CONSTRAINT "UserResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserResultCertainty" DROP CONSTRAINT "UserResultCertainty_diagnoseId_fkey";

-- DropForeignKey
ALTER TABLE "UserResultCertainty" DROP CONSTRAINT "UserResultCertainty_userResultId_fkey";

-- DropTable
DROP TABLE "DiagnoseSymptom";

-- DropTable
DROP TABLE "Diagnosis";

-- DropTable
DROP TABLE "Symptom";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserAnswer";

-- DropTable
DROP TABLE "UserResult";

-- DropTable
DROP TABLE "UserResultCertainty";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_answers" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "symptom_id" INTEGER NOT NULL,
    "answer" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_results" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "symptoms" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnoses" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "diagnose_header_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnoses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagnose_symptoms" (
    "id" SERIAL NOT NULL,
    "diagnose_id" INTEGER NOT NULL,
    "symptom_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagnose_symptoms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_results_certainties" (
    "id" SERIAL NOT NULL,
    "user_result_id" INTEGER NOT NULL,
    "diagnose_id" INTEGER NOT NULL,
    "certainty" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_results_certainties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "symptoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_results" ADD CONSTRAINT "user_results_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnose_symptoms" ADD CONSTRAINT "diagnose_symptoms_diagnose_id_fkey" FOREIGN KEY ("diagnose_id") REFERENCES "diagnoses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagnose_symptoms" ADD CONSTRAINT "diagnose_symptoms_symptom_id_fkey" FOREIGN KEY ("symptom_id") REFERENCES "symptoms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_results_certainties" ADD CONSTRAINT "user_results_certainties_user_result_id_fkey" FOREIGN KEY ("user_result_id") REFERENCES "user_results"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_results_certainties" ADD CONSTRAINT "user_results_certainties_diagnose_id_fkey" FOREIGN KEY ("diagnose_id") REFERENCES "diagnoses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
