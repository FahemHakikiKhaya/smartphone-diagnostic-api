import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteSymptomsDTO {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
