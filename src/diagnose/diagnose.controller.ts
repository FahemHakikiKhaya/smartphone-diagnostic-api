import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { UpsertDiagnoseDTO } from './dto/upsert-diagnose.dto';
import { DiagnoseService } from './diagnose.service';
import { GetDiagnosesDTO } from './dto/get-diagnoses.dto';
import { DeleteDiagnosesDTO } from './dto/delete-diagnoses.dto';

@Controller('diagnoses')
export class DiagnoseController {
  constructor(private readonly diagnoseService: DiagnoseService) {}
  @Put('/')
  async upsertDiagnose(@Body() body: UpsertDiagnoseDTO) {
    return await this.diagnoseService.upsertDiagnose(body);
  }

  @Get('/')
  async getDiagnoses(@Query() query: GetDiagnosesDTO) {
    return await this.diagnoseService.getDiagnoses(query);
  }

  @Delete('/')
  async deleteDiagnoses(@Body() body: DeleteDiagnosesDTO) {
    return await this.diagnoseService.deleteDiagnoses(body);
  }
}
