import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryParams } from 'src/pagination/dto/pagination.dto';

export class getDiagnoseSymptomsDTO extends PaginationQueryParams {
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly search: string;
}
