import { Min } from 'class-validator';

export class UpdateCounterDto {
  @Min(1)
  value: number;
}