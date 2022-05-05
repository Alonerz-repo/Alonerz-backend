import { EntityRepository, Repository } from 'typeorm';
import { Career } from './career.entity';
import { CreateCareerDto } from './dto/create.career.dto';
import { UpdateCareerDto } from './dto/update.career.dto';

@EntityRepository(Career)
export class CareerRepository extends Repository<Career> {
  // 단일 커리어 정보 조회
  public async findCareerByCareerId(careerId: number): Promise<Career> {
    return await this.findOne(careerId);
  }

  // 사용자 커리어 정보 조회
  public async findCareersByUserId(userId: number): Promise<Career[]> {
    return await this.find({ where: { userId } });
  }

  // 사용자 커리어 정보 추가
  public async createCareer(
    userId: number,
    createCareerDto: CreateCareerDto,
  ): Promise<number> {
    const { careerId } = await this.save({ userId, ...createCareerDto });
    return careerId;
  }

  // 사용자 커리어 정보 수정
  public async updateCareer(
    userId: number,
    updateCareerDto: UpdateCareerDto,
  ): Promise<void> {
    await this.update(userId, updateCareerDto);
  }

  // 사용자 커리어 정보 삭제
  public async deleteCareer(careerId: number): Promise<void> {
    await this.delete(careerId);
  }
}
