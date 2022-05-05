import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Guest } from './guest.entity';

@Entity('groups')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly groupId: number;

  @Column()
  readonly title: string;

  @Column()
  readonly menu: string;

  @Column('datetime')
  readonly startAt: Date;

  @Column('datetime')
  readonly endAt: Date;

  @Column()
  readonly memberLimit: number;

  @Column()
  readonly description: string;

  @Column({ nullable: true, default: null })
  readonly imageUrl?: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @DeleteDateColumn({ default: null })
  readonly deletedAt: Date;

  // Group:User = N:1 관계
  // eager: true
  @ManyToOne(() => User, (user) => user.hostGroups, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'kakaoId' })
  readonly host: string;

  // Group:Guest = 1:N 관계
  // eager 로딩 방식 적용
  @OneToMany(() => Guest, (guest) => guest.groupId, {
    onDelete: 'CASCADE',
    eager: true,
  })
  readonly guests: Guest[];
}
