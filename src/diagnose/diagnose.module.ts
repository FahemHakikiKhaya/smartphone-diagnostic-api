import { Module } from '@nestjs/common';
import { DiagnoseController } from './diagnose.controller';
import { DiagnoseService } from './diagnose.service';

@Module({
  controllers: [DiagnoseController],
  providers: [DiagnoseService]
})
export class DiagnoseModule {}
