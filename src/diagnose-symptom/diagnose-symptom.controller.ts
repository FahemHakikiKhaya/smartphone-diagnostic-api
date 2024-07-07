import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { getDiagnoseSymptomsDTO } from './dto/get-diagnose-symptoms.dto';
import { DiagnoseSymptomService } from './diagnose-symptom.service';
import { CreateDiagnoseSymptomDTO } from './dto/create-diagnose-symptom.dto';
import { DeleteDiagnoseSymptomsDTO } from './dto/delete-diagnoses-symptoms.dto';

@Controller('diagnose-symptoms')
export class DiagnoseSymptomController {
  constructor(
    private readonly diagnoseSymptomService: DiagnoseSymptomService,
  ) {}

  @Get('/')
  async getDiagnoseSymptoms(@Query() query: getDiagnoseSymptomsDTO) {
    return await this.diagnoseSymptomService.getDiagnoseSymptoms(query);
  }

  @Post('/')
  async createDiagnoseSymptom(@Body() body: CreateDiagnoseSymptomDTO) {
    return await this.diagnoseSymptomService.createDiagnoseSymptom(body);
  }

  @Delete('/')
  async deleteDiagnoseSymptoms(@Body() body: DeleteDiagnoseSymptomsDTO) {
    return await this.diagnoseSymptomService.deleteDiagnoseSymptoms(body);
  }
}
