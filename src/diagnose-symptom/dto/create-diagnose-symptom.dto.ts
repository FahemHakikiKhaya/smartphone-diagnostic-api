import { Transform } from 'class-transformer';

export class CreateDiagnoseSymptomDTO {
  @Transform(({ value }) => parseInt(value, 10))
  readonly diagnoseId: number;
  @Transform(({ value }) => parseInt(value, 10))
  readonly symptomId: number;
  @Transform(({ value }) => parseInt(value, 10))
  readonly certaintyFactor: number;
}
