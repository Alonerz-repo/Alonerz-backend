import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CareerController } from 'src/controller/career.controller';
import { Career } from 'src/entity/career.entity';
import { CareerService } from 'src/service/career.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Career])],
  controllers: [CareerController],
  providers: [CareerService],
})
export class CareerModule {}
