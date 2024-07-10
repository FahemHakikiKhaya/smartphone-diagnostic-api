import { IsArray, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserAnswerDTO } from 'src/user-answer/dto/create-user-answer.dto';

export class CreateUserResultDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserAnswerDTO)
  userAnswers: CreateUserAnswerDTO[];
}
