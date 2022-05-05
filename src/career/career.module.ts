import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerController } from './career.controller';
import { CareerException } from './career.exception';
import { CareerRepository } from './career.repository';
import { CareerService } from './career.service';

@Module({
  imports: [TypeOrmModule.forFeature([CareerRepository])],
  providers: [CareerService, CareerException],
  controllers: [CareerController],
})
export class CareerModule {}
