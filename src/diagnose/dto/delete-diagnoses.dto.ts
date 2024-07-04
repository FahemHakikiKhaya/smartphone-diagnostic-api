import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteDiagnosesDTO {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
