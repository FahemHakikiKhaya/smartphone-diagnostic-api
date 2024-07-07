import { Module } from '@nestjs/common';
import { DiagnoseSymptomController } from './diagnose-symptom.controller';
import { DiagnoseSymptomService } from './diagnose-symptom.service';

@Module({
  controllers: [DiagnoseSymptomController],
  providers: [DiagnoseSymptomService]
})
export class DiagnoseSymptomModule {}
