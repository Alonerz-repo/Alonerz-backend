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

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  nickname: string;

  @Column({ default: null })
  password: string;

  @Column({ type: 'bigint', default: null })
  kakaoId: number;

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
