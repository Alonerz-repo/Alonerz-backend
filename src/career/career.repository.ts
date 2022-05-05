import { EntityRepository, Repository } from 'typeorm';
import { UserCareer } from './career.entity';

@EntityRepository(UserCareer)
export class CareerRepository extends Repository<UserCareer> {
  // 사용자 커리어 정보 조회
  // 사용자 커리어 정보 추가
  // 사용자 커리어 정보 수정
  // 사용자 커리어 정보 삭제
}
