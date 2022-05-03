import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Career } from './career.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  kakaoId: string;

  @Column({ default: 0 })
  point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  // 1:N 관계, eager 로딩 방식 적용
  @OneToMany(() => Career, (career) => career.kakaoId, {
    onDelete: 'CASCADE',
    eager: true,
  })
  careers: Career[];
}
