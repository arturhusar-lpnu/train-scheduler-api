import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class UpdateTrainNumberDto {
  @IsNumber()
  @Type(() => Number)
  trainNumber: number;
}
