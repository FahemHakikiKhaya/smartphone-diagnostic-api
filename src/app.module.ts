import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnoseModule } from './diagnose/diagnose.module';
import { PrismaModule } from './prisma/prisma.module';
import { PaginationModule } from './pagination/pagination.module';
import { SymptomModule } from './symptom/symptom.module';
import { DiagnoseSymptomModule } from './diagnose-symptom/diagnose-symptom.module';

@Module({
  imports: [DiagnoseModule, PrismaModule, PaginationModule, SymptomModule, DiagnoseSymptomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
