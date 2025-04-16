import {
  IsNotEmpty,
  IsNumber,
  MinLength,
  IsString,
  MaxLength,
  IsDate,
} from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity()
@Unique(['trainNumber', 'departure', 'destination', 'departureTime'])
export class Train {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'train_number' })
  @IsNumber()
  trainNumber: number;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  departure: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  destination: string;

  @Column('timestamp without time zone', { name: 'departure_time' })
  @IsDate()
  departureTime: Date;

  @Column('timestamp without time zone', { name: 'arrival_time' })
  @IsDate()
  arrivalTime: Date;

  @Column()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  station: string;
}
