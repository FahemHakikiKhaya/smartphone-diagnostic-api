import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertDiagnoseDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly solution: string;

  @IsOptional()
  @IsString()
  readonly code: string;
}
