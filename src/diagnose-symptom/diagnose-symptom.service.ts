import { Injectable } from '@nestjs/common';
import { getDiagnoseSymptomsDTO } from './dto/get-diagnose-symptoms.dto';
import { PaginationResponse } from 'src/pagination/types';
import { DiagnoseSymptom, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';
import { CreateDiagnoseSymptomDTO } from './dto/create-diagnose-symptom.dto';
import { DeleteDiagnoseSymptomsDTO } from './dto/delete-diagnoses-symptoms.dto';

@Injectable()
export class DiagnoseSymptomService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly PaginationService: PaginationService,
  ) {}
  async getDiagnoseSymptoms(
    query: getDiagnoseSymptomsDTO,
  ): Promise<PaginationResponse<DiagnoseSymptom>> {
    const { page, take, id, search } = query;

    const whereClause: Prisma.DiagnoseSymptomWhereInput = {
      diagnoseId: id,
    };

    if (search) {
      whereClause.OR = [
        {
          symptom: {
            code: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
        {
          symptom: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    const [diagnoses, count] = await this.PrismaService.$transaction([
      this.PrismaService.diagnoseSymptom.findMany({
        where: whereClause,
        skip: (page - 1) * take,
        take,
        include: {
          diagnose: true,
          symptom: true,
        },
      }),
      this.PrismaService.diagnoseSymptom.count({
        where: whereClause,
      }),
    ]);

    const meta = this.PaginationService.generatePaginationMeta(
      count,
      page,
      take,
    );

    return {
      data: diagnoses,
      meta,
    };
  }

  async createDiagnoseSymptom(body: CreateDiagnoseSymptomDTO) {
    const newDiagnoseSymptom = await this.PrismaService.diagnoseSymptom.create({
      data: body,
    });

    return newDiagnoseSymptom;
  }

  async deleteDiagnoseSymptoms(body: DeleteDiagnoseSymptomsDTO) {
    return await this.PrismaService.diagnoseSymptom.deleteMany({
      where: {
        id: {
          in: body.ids,
        },
      },
    });
  }
}
