import {
  Controller,
  Get,
  UseGuards,
  Body,
  Post,
  Put,
  Delete,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TrainService } from './train.service';
import { GetTrainsFilterDto } from './dtos/get-train-filter.dto';
import { Train } from './entities/train.entity';
import { CreateTrainDto } from './dtos/create-train.dto';
import { UpdateTrainRouteDto } from './dtos/update-train-route.dto';
import { UpdateScheduleDto } from './dtos/update-shedule-time.dto';
import { UpdateTrainNumberDto } from './dtos/update-train-number.dto';
import { UpdateTrainStationDto } from './dtos/update-train-station.dto';

@Controller('trains')
@UseGuards(AuthGuard())
export class TrainController {
  constructor(private trainService: TrainService) {}
  /// GET
  @Get('/')
  public async getTrains(
    @Query() filterDto: GetTrainsFilterDto,
  ): Promise<Train[]> {
    return this.trainService.getTrains(filterDto);
  }

  @Get('/:id')
  public async getTrain(@Param('id', ParseIntPipe) id: number): Promise<Train> {
    return this.trainService.getTrain(id);
  }

  /// POST
  @Post('/new-train')
  public async addNewTrain(
    @Body() createTrainDto: CreateTrainDto,
  ): Promise<Train> {
    return this.trainService.addNewTrain(createTrainDto);
  }

  /// PUT
  @Put('/:id/update-route')
  public async updateTrainRoute(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrainRouteDto: UpdateTrainRouteDto,
  ): Promise<Train> {
    return this.trainService.updateTrainRoute(id, updateTrainRouteDto);
  }

  @Put('/:id/update-schedule-time')
  public async updateTrainScheduleTime(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrainScheduleTimeDto: UpdateScheduleDto,
  ): Promise<Train> {
    return this.trainService.updateTrainScheduleTime(
      id,
      updateTrainScheduleTimeDto,
    );
  }

  @Put('/:id/update-number')
  public async updateTrainNumber(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrainNumberDto: UpdateTrainNumberDto,
  ): Promise<Train> {
    return this.trainService.updateTrainNumber(id, updateTrainNumberDto);
  }

  @Put('/:id/update-station')
  public async updateTrainStation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTrainStationDto: UpdateTrainStationDto,
  ): Promise<Train> {
    return this.trainService.updateTrainStation(id, updateTrainStationDto);
  }

  /// DELETE
  @Delete('/:id/remove-train')
  public async removeTrain(@Param('id', ParseIntPipe) id: number) {
    return this.trainService.removeTrain(id);
  }
}
