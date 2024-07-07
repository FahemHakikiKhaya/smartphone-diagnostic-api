import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PaginationQueryParams } from 'src/pagination/dto/pagination.dto';

export class GetDiagnosesDTO extends PaginationQueryParams {
  @IsOptional()
  @IsString()
  readonly search: string;
}
