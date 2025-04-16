import { Injectable } from '@nestjs/common';
import { TrainRepository } from './repositories/train.repository';
import { GetTrainsFilterDto } from './dtos/get-train-filter.dto';
import { CreateTrainDto } from './dtos/create-train.dto';
import { UpdateTrainRouteDto } from './dtos/update-train-route.dto';
import { UpdateScheduleDto } from './dtos/update-shedule-time.dto';
import { UpdateTrainNumberDto } from './dtos/update-train-number.dto';
import { UpdateTrainStationDto } from './dtos/update-train-station.dto';
import { Train } from './entities/train.entity';

@Injectable()
export class TrainService {
  constructor(private trainRepo: TrainRepository) {}

  public async getTrains(filterDto: GetTrainsFilterDto): Promise<Train[]> {
    return await this.trainRepo.getTrains(filterDto); //add pagination
  }

  public async getTrain(id: number): Promise<Train> {
    return this.trainRepo.getTrainById(id);
  }

  public async addNewTrain(createTrainDto: CreateTrainDto): Promise<Train> {
    return this.trainRepo.createTrain(createTrainDto);
  }

  public async updateTrainRoute(
    id: number,
    updateTrainRouteDto: UpdateTrainRouteDto,
  ): Promise<Train> {
    return this.trainRepo.updateTrainRoute(id, updateTrainRouteDto);
  }

  public async updateTrainScheduleTime(
    id: number,
    updateTrainScheduleTimeDto: UpdateScheduleDto,
  ): Promise<Train> {
    return this.trainRepo.updateTrainShedule(id, updateTrainScheduleTimeDto);
  }

  public async updateTrainNumber(
    id: number,
    updateTrainNumberDto: UpdateTrainNumberDto,
  ): Promise<Train> {
    return this.trainRepo.updateTrainNumber(id, updateTrainNumberDto);
  }

  public async updateTrainStation(
    id: number,
    updateTrainStationDto: UpdateTrainStationDto,
  ): Promise<Train> {
    return this.trainRepo.updateTrainStation(id, updateTrainStationDto);
  }

  public async removeTrain(id: number) {
    return this.trainRepo.removeTrain(id);
  }
}
