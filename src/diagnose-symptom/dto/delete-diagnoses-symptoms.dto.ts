import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteDiagnoseSymptomsDTO {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];
}
