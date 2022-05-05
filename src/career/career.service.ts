import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerException } from './career.exception';
import { CareerRepository } from './career.repository';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(CareerRepository)
    private readonly careerRepository: CareerRepository,
    private readonly careerException: CareerException,
  ) {}
}
