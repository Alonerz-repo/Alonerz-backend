import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// TODO : Career 테이블 JOIN 설정
@Entity('users')
export class User extends BaseEntity {
  // TODO : 카카오 계정만 사용하는 경우 제거
  @PrimaryGeneratedColumn()
  userId: number;

  // TODO : 카카오 계정만 사용하는 경우 제거
  @Column({ default: null })
  email: string;

  // TODO : 카카오 계정만 사용하는 경우 제거
  @Column({ default: null })
  nickname: string;

  // TODO : 카카오 계정만 사용하는 경우 제거
  @Column({ default: null })
  password: string;

  // TODO : 카카오 계정만 사용하는 경우 string으로 변환 후 Primary Key로 지정
  @Column({ type: 'bigint', default: null })
  kakaoId: number;

  // TODO : 카카오 계정만 사용하는 경우 제거
  @Column({ default: null })
  gender: string;

  @Column({ default: 0 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
