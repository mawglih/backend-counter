import { Min } from "class-validator";

export class CreateCounterDto {
  @Min(0)
  value: number;
}