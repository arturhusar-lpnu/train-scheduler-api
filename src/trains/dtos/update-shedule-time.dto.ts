import { Type } from 'class-transformer';
import { IsOptional, IsDate } from 'class-validator';

export class UpdateScheduleDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  departureTime?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  arrivalTime?: Date;
}
