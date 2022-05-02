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
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  // 카카오 계정 정보
  // TODO : 별도의 테이블로 관리할 것
  @Column({ default: null })
  kakaoId: number;

  @Column({ default: null })
  kakaoNickname: string;

  @Column({ default: null })
  kakaoEmail: string;

  @Column({ default: null })
  kakaoGender: string;

  @Column({ default: null })
  kakaoProfileImageUrl: string;

  @Column({ default: null })
  kakaoConnectedAt: Date;
}
