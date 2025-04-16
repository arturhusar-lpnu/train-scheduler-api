import { Module } from '@nestjs/common';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';
import { TrainRepository } from './repositories/train.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './entities/train.entity';

@Module({
  imports: [AuthModule, ConfigModule, TypeOrmModule.forFeature([Train])],
  controllers: [TrainController],
  providers: [TrainService, TrainRepository],
})
export class TrainModule {}
