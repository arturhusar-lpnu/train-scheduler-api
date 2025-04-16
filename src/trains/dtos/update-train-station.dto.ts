import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTrainStationDto {
  @IsString()
  @IsNotEmpty()
  station: string;
}
