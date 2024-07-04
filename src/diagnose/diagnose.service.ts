import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpsertDiagnoseDTO } from './dto/upsert-diagnose.dto';
import { Diagnose, Prisma } from '@prisma/client';
import { GetDiagnosesDTO } from './dto/get-diagnoses.dto';
import { PaginationResponse } from 'src/pagination/types';
import { PaginationService } from 'src/pagination/pagination.service';
import { DeleteDiagnosesDTO } from './dto/delete-diagnoses.dto';

@Injectable()
export class DiagnoseService {
  constructor(
    private readonly PrismaService: PrismaService,
    private readonly PaginationService: PaginationService,
  ) {}

  async upsertDiagnose(body: UpsertDiagnoseDTO): Promise<Diagnose> {
    const latestDiagnose = await this.PrismaService.diagnose.findFirst({
      orderBy: {
        id: 'desc',
      },
    });

    // Extract the number from the latest code if it exists, else start with 1
    let nextNumber = 1;
    if (latestDiagnose && latestDiagnose.code) {
      const latestNumber = parseInt(latestDiagnose.code.replace('DN', ''), 10);
      nextNumber = latestNumber + 1;
    }

    // Generate the new code
    const newCode = `DN${nextNumber}`;

    const newDiagnose = await this.PrismaService.diagnose.upsert({
      where: {
        code: body.code,
      },
      update: {
        name: body.name,
        solution: body.solution,
      },
      create: {
        code: newCode,
        name: body.name,
        solution: body.solution,
      },
    });

    return newDiagnose;
  }

  async getDiagnoses(
    query: GetDiagnosesDTO,
  ): Promise<PaginationResponse<Diagnose>> {
    const { page, take } = query;
    const whereClause: Prisma.DiagnoseWhereInput = {};

    console.log({ query });

    const [diagnoses, count] = await this.PrismaService.$transaction([
      this.PrismaService.diagnose.findMany({
        where: whereClause,
        skip: (page - 1) * take,
        take,
      }),
      this.PrismaService.diagnose.count({
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

  async deleteDiagnoses(body: DeleteDiagnosesDTO) {
    return await this.PrismaService.diagnose.deleteMany({
      where: {
        id: {
          in: body.ids,
        },
      },
    });
  }
}
