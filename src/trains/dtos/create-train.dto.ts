import { IsNumber, IsString, IsNotEmpty, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateTrainDto {
  @Type(() => Number)
  @IsNumber()
  trainNumber: number;

  @IsString()
  @IsNotEmpty()
  departure: string;

  @IsString()
  @IsNotEmpty()
  destination: string;

  @IsDate()
  @Type(() => Date)
  departureTime: Date;

  @IsDate()
  @Type(() => Date)
  arrivalTime: Date;

  @IsString()
  @IsNotEmpty()
  station: string;
}
