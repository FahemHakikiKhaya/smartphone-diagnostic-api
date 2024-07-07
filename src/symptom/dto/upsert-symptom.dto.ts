import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpsertSymptomDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly question: string;

  @IsOptional()
  @IsString()
  readonly code: string;
}
