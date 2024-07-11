import { IsArray, ValidateNested, IsInt, IsNumber } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateUserAnswerDTO } from 'src/user-answer/dto/create-user-answer.dto';

export class CreateUserResultDTO {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserAnswerDTO)
  userAnswers: CreateUserAnswerDTO[];
}
