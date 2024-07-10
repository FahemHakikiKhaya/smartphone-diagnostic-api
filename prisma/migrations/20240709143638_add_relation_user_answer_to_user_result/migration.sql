-- AlterTable
ALTER TABLE "user_answers" ADD COLUMN     "user_result_id" INTEGER,
ALTER COLUMN "certaintyFactor" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_user_result_id_fkey" FOREIGN KEY ("user_result_id") REFERENCES "user_results"("id") ON DELETE SET NULL ON UPDATE CASCADE;
