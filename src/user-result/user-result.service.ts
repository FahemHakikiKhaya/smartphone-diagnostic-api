import { Injectable } from '@nestjs/common';
import { CreateUserResultDTO } from './dto/create-user-result.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserResultService {
  constructor(private readonly PrismaService: PrismaService) {}

  async createUserResult(body: CreateUserResultDTO) {
    const diagnoses = await this.PrismaService.diagnose.findMany({
      where: {
        symptoms: {
          some: {},
        },
      },
      include: {
        symptoms: true,
      },
    });

    const userResultCertainties = diagnoses.map(({ symptoms, id }) => {
      let countTrueAnswers = 0;
      symptoms.map((symptom) => {
        const userAnswerIsTrue = body.userAnswers.some(
          ({ answer, symptomId }) => answer && symptomId === symptom.symptomId,
        );

        if (userAnswerIsTrue) countTrueAnswers += 1;
      });

      const certainty = countTrueAnswers / symptoms.length;
      const formattedCertainty = Math.round(certainty * 100) / 100;

      return {
        diagnoseId: id,
        certainty: formattedCertainty,
      };
    });

    const newUserResult = await this.PrismaService.userResult.create({
      data: {
        userId: 1,
        answers: {
          createMany: {
            data: body.userAnswers,
          },
        },
        certainties: {
          createMany: {
            data: userResultCertainties,
          },
        },
      },
    });

    return newUserResult;
  }
}
