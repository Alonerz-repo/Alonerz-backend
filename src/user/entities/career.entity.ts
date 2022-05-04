import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('careers')
export class Career extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly careerId: number;

  @Column()
  readonly part: string;

  @Column()
  readonly year: string;

  @Column()
  readonly description: string;

  @ManyToOne(() => User, (user) => user.careers)
  @JoinColumn({ name: 'kakaoId' })
  readonly kakaoId: string;
}
