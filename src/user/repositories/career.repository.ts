import { EntityRepository, Repository } from 'typeorm';
import { Career } from '../entities/career.entity';
import { CreateCareerDto } from '../dto/create.career.dto';
import { UpdateCareerDto } from '../dto/update.career.dto';

@EntityRepository(Career)
export class CareerRepository extends Repository<Career> {
  // 사용자의 모든 커리어 정보 조회
  async findAllCareerByKakaoId(kakaoId: string): Promise<Career[]> {
    return await this.find({ kakaoId });
  }
  // 사용자 커리어 정보 추가
  async createCareer(
    kakaoId: string,
    createCareerDto: CreateCareerDto,
  ): Promise<number> {
    const { careerId } = await this.save({ ...createCareerDto, kakaoId });
    return careerId;
  }

  // 사용자 특정 커리어 정보 조회
  async findCareerByKakaoIdAndCareerId(
    kakaoId: string,
    careerId: number,
  ): Promise<Career> {
    return this.findOne({ kakaoId, careerId });
  }

  // 사용자 커리어 정보 수정
  async updateCareer(
    careerId: number,
    updateCareerDto: UpdateCareerDto,
  ): Promise<void> {
    await this.update(careerId, updateCareerDto);
  }

  // 사용자 커리어 정보 삭제
  async deleteCareer(careerId: number): Promise<void> {
    await this.delete(careerId);
  }
}
