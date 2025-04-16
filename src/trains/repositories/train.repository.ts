import { DataSource, Repository } from 'typeorm';
import { Train } from '../entities/train.entity';
import { GetTrainsFilterDto } from '../dtos/get-train-filter.dto';
import { CreateTrainDto } from '../dtos/create-train.dto';
import { UpdateTrainRouteDto } from '../dtos/update-train-route.dto';
import { UpdateScheduleDto } from '../dtos/update-shedule-time.dto';
import { UpdateTrainNumberDto } from '../dtos/update-train-number.dto';
import { UpdateTrainStationDto } from '../dtos/update-train-station.dto';
import {
  NotFoundException,
  ConflictException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TrainRepository extends Repository<Train> {
  constructor(private dataSource: DataSource) {
    super(Train, dataSource.createEntityManager());
  }

  public async getTrains(filterDto: GetTrainsFilterDto): Promise<Train[]> {
    const {
      trainNumber,
      departure,
      destination,
      departureTime,
      arrivalTime,
      station,
    } = filterDto;

    const query = this.createQueryBuilder('train');

    if (trainNumber) {
      query.andWhere('train.train_number = :trainNumber', { trainNumber });
    }

    if (departure) {
      query.andWhere('LOWER(train.departure) LIKE LOWER(:departure)', {
        departure: `%${departure}%`,
      });
    }

    if (destination) {
      query.andWhere('LOWER(train.destination) LIKE LOWER(:destination)', {
        destination: `%${destination}%`,
      });
    }

    if (departureTime) {
      query.andWhere('train.departure_time >= :departure_time', {
        departure_time: departureTime,
      });
    }

    if (arrivalTime) {
      query.andWhere('train.arrival_time <= :arrival_time', {
        arrival_time: arrivalTime,
      });
    }

    if (station) {
      query.andWhere('LOWER(train.station) LIKE LOWER(:station)', {
        station: `%${station}%`,
      });
    }

    query.orderBy('train.departure_time', 'ASC');

    return await query.getMany();
  }

  public async getTrainById(id: number): Promise<Train> {
    const found = await this.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Train with id : ${id} not found`);
    }

    return found;
  }

  public async createTrain(createTrainDto: CreateTrainDto): Promise<Train> {
    const {
      trainNumber,
      departure,
      destination,
      departureTime,
      arrivalTime,
      station,
    } = createTrainDto;

    await this.checkUniqueRoute(
      -1,
      trainNumber,
      departure,
      destination,
      departureTime,
    );

    const train = this.create({
      trainNumber,
      departure,
      destination,
      departureTime,
      arrivalTime,
      station,
    });

    return await this.save(train);
  }

  public async updateTrainRoute(
    id: number,
    updateRouteDto: UpdateTrainRouteDto,
  ): Promise<Train> {
    const { departure, destination } = updateRouteDto;
    const train = await this.getTrainById(id);

    const newDeparture = departure ?? train.departure;
    const newDestination = departure ?? train.destination;
    const newDepartureTime = train.departureTime;

    await this.checkUniqueRoute(
      id,
      train.trainNumber,
      newDeparture,
      newDestination,
      newDepartureTime,
    );

    if (departure) {
      train.departure = departure;
    }

    if (destination) {
      train.destination = destination;
    }

    return await this.save(train);
  }

  private async checkUniqueRoute(
    id: number,
    trainNumber: number,
    departure: string,
    destination: string,
    departureTime: Date,
  ): Promise<void> {
    const found = await this.findOne({
      where: {
        trainNumber,
        departure,
        destination,
        departureTime,
      },
    });

    if (found && found.id !== id) {
      throw new ConflictException(
        `Train ${trainNumber} already exists with this time and route`,
      );
    }
  }

  public async updateTrainShedule(
    id: number,
    updateScheduleDto: UpdateScheduleDto,
  ): Promise<Train> {
    const { departureTime, arrivalTime } = updateScheduleDto;

    const train = await this.getTrainById(id);

    const newDepTime = departureTime ?? train.departureTime;

    await this.checkUniqueRoute(
      id,
      train.trainNumber,
      train.departure,
      train.destination,
      newDepTime,
    );

    if (departureTime) {
      train.departureTime = departureTime;
    }

    if (arrivalTime) {
      train.departureTime = arrivalTime;
    }

    return this.save(train);
  }

  public async updateTrainNumber(
    id: number,
    updateTrainNumberDto: UpdateTrainNumberDto,
  ): Promise<Train> {
    const { trainNumber } = updateTrainNumberDto;
    const train = await this.getTrainById(id);

    await this.checkUniqueRoute(
      id,
      trainNumber,
      train.departure,
      train.destination,
      train.departureTime,
    );

    train.trainNumber = trainNumber;

    return await this.save(train);
  }

  public async updateTrainStation(
    id: number,
    updateTrainStation: UpdateTrainStationDto,
  ): Promise<Train> {
    const { station } = updateTrainStation;
    const train = await this.getTrainById(id);

    train.station = station;

    return await this.save(train);
  }

  public async removeTrain(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Train with id : ${id} not found`);
    }
  }
}
