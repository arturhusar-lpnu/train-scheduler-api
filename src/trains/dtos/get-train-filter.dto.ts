import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDateString,
  IsDate,
} from 'class-validator';

import { Type } from 'class-transformer';

export class GetTrainsFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  trainNumber?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  departure?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  destination?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  departureTime?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  arrivalTime?: Date;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  station?: string;
}
