import { Group } from '../../group/entities/group.entity';
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
import { Guest } from 'src/group/entities/guest.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'varchar' })
  readonly kakaoId: string;

  @Column({ default: 0 })
  readonly point: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;

  // User:Career = 1:N 관계
  // eager 로딩 방식 적용
  @OneToMany(() => Career, (career) => career.kakaoId, {
    onDelete: 'CASCADE',
    eager: true,
  })
  readonly careers: Career[];

  // User:Group = 1:N 관계
  @OneToMany(() => Group, (group) => group.host, {
    onDelete: 'CASCADE',
  })
  hostGroups: Group[];

  // User:Guest = 1:N 관계
  @OneToMany(() => Guest, (guest) => guest.kakaoId, {
    onDelete: 'CASCADE',
  })
  guestGroups: Guest[];
}
