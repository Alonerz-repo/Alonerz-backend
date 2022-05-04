import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Group } from './group.entity';

@Entity('guests')
export class Guest extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly guestId: number;

  @CreateDateColumn()
  readonly createdAt: Date;

  @DeleteDateColumn()
  readonly deletedAt: Date;

  // Guest : Group = N:1 관계
  @ManyToOne(() => Group, (group) => group.guests)
  @JoinColumn({ name: 'groupId' })
  readonly groupId: string;

  // Guest : User = N:1 관계
  @ManyToOne(() => User, (user) => user.guestGroups)
  @JoinColumn({ name: 'kakaoId' })
  readonly kakaoId: string;
}
