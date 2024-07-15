import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationQueryParams } from 'src/pagination/dto/pagination.dto';

export class GetSymptomsDTO extends PaginationQueryParams {
  @IsOptional()
  @IsString()
  readonly search: string;

  @IsBoolean()
  readonly all: boolean;
}
