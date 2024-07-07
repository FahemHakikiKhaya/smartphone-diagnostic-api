import { Injectable } from '@nestjs/common';
import { Prisma, Symptom } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertSymptomDTO } from './dto/upsert-symptom.dto';
import { PaginationResponse } from 'src/pagination/types';
import { DeleteSymptomsDTO } from './dto/delete-symptoms.dto';
import { GetSymptomsDTO } from './dto/get-symptoms.dto';

@Injectable()
export class SymptomService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly paginationService: PaginationService,
  ) {}

  async upsertSymptom(body: UpsertSymptomDTO): Promise<Symptom> {
    const latestSymptom = await this.prismaService.symptom.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    // Extract the number from the latest code if it exists, else start with 1
    let nextNumber = 1;
    if (latestSymptom && latestSymptom.code) {
      const latestNumber = parseInt(latestSymptom.code.replace('SM', ''), 10);
      nextNumber = latestNumber + 1;
    }

    // Generate the new code
    const newCode = `SM${nextNumber}`;

    const newSymptom = await this.prismaService.symptom.upsert({
      where: {
        code: body.code,
      },
      update: {
        name: body.name,
        question: body.question,
      },
      create: {
        code: newCode,
        name: body.name,
        question: body.question,
      },
    });

    return newSymptom;
  }

  async getSymptoms(
    query: GetSymptomsDTO,
  ): Promise<PaginationResponse<Symptom>> {
    const { page, take, search, all = false } = query;
    const whereClause: Prisma.SymptomWhereInput = {};

    if (search) {
      whereClause.OR = [
        {
          code: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ];
    }

    const [symptoms, count] = await this.prismaService.$transaction([
      this.prismaService.symptom.findMany({
        where: whereClause,
        ...(!all && { skip: (page - 1) * take, take }),
      }),
      this.prismaService.symptom.count({
        where: whereClause,
      }),
    ]);

    const meta = this.paginationService.generatePaginationMeta(
      count,
      page,
      take,
    );

    return {
      data: symptoms,
      meta,
    };
  }

  async deleteSymptoms(body: DeleteSymptomsDTO) {
    return await this.prismaService.symptom.deleteMany({
      where: {
        id: {
          in: body.ids,
        },
      },
    });
  }
}
