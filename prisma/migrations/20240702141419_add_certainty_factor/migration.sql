-- AlterTable
ALTER TABLE "diagnose_symptoms" ADD COLUMN     "certaintyFactor" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE "user_answers" ADD COLUMN     "certaintyFactor" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
