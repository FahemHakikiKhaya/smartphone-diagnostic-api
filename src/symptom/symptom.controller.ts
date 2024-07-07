import { Body, Controller, Delete, Get, Put, Query } from '@nestjs/common';
import { UpsertSymptomDTO } from './dto/upsert-symptom.dto';
import { SymptomService } from './symptom.service';
import { GetSymptomsDTO } from './dto/get-symptoms.dto';
import { DeleteSymptomsDTO } from './dto/delete-symptoms.dto';

@Controller('symptoms')
export class SymptomController {
  constructor(private readonly symptomService: SymptomService) {}
  @Put('/')
  async upsertSymptom(@Body() body: UpsertSymptomDTO) {
    return await this.symptomService.upsertSymptom(body);
  }

  @Get('/')
  async getSymptoms(@Query() query: GetSymptomsDTO) {
    return await this.symptomService.getSymptoms(query);
  }

  @Delete('/')
  async deleteSymptoms(@Body() body: DeleteSymptomsDTO) {
    return await this.symptomService.deleteSymptoms(body);
  }
}
