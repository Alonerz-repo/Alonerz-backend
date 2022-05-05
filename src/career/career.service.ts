import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareerException } from './career.exception';
import { CareerRepository } from './career.repository';
import { CreateCareerDto } from './dto/create.career.dto';
import { UpdateCareerDto } from './dto/update.career.dto';
import { Career } from './career.entity';

@Injectable()
export class CareerService {
  constructor(
    @InjectRepository(CareerRepository)
    private readonly careerRepository: CareerRepository,
    private readonly careerException: CareerException,
  ) {}

  // 특정 커리어 조회
  private async getCareer(careerId: number) {
    const career = await this.careerRepository.findCareerByCareerId(careerId);
    if (!career) this.careerException.notFound();
    return career;
  }

  // 사용자 커리어 정보 조회
  public async getCareers(userId: number): Promise<Career[]> {
    return await this.careerRepository.findCareersByUserId(userId);
  }

  // 사용자 커리어 정보 추가
  public async createMyCareer(
    userId: number,
    createCareerDto: CreateCareerDto,
  ): Promise<number> {
    const careers = await this.getCareers(userId);
    if (careers.length >= 2) this.careerException.tooLarge();
    return await this.careerRepository.createCareer(userId, createCareerDto);
  }

  // 사용자 커리어 정보 수정
  public async updateCareer(
    careerId: number,
    updateCareerDto: UpdateCareerDto,
  ): Promise<void> {
    await this.getCareer(careerId);
    await this.updateCareer(careerId, updateCareerDto);
  }

  // 사용자 커리어 정보 삭제
  public async deleteCareer(careerId: number): Promise<void> {
    await this.getCareer(careerId);
    await this.deleteCareer(careerId);
  }
}
