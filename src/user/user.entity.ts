import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  // 사용자 식별값
  @PrimaryGeneratedColumn()
  public userId: number;

  // 카카오 계정 ID
  @Column('varchar')
  public kakaoId: string;

  // 닉네임
  @Column({ default: String(Date.now()) })
  public nickname: string;

  // 프로필 이미지 URL
  @Column({ default: null })
  public profileImageUrl: string;

  // 가입일자
  @CreateDateColumn()
  public createdAt: Date;

  // 수정일자
  @UpdateDateColumn()
  public updatedAt: Date;

  // 탈퇴일자
  @DeleteDateColumn({ default: null })
  public deletedAt: Date;
}
