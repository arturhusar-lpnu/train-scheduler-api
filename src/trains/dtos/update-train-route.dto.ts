import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateTrainRouteDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  departure?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  destination?: string;
}
