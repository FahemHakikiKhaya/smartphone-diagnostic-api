/*
  Warnings:

  - A unique constraint covering the columns `[symptom_id,diagnose_id]` on the table `diagnose_symptoms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "diagnose_symptoms_symptom_id_diagnose_id_key" ON "diagnose_symptoms"("symptom_id", "diagnose_id");
