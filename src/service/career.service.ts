import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Career } from 'src/entity/career.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(Career)
    private readonly careerRepository: Repository<Career>,
  ) {}

  async getAllCareers() {
    return await this.careerRepository.find();
  }
}
