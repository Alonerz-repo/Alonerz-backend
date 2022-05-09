import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Career } from './career.entity';
import { User } from './user.entity';

@Entity('user_careers')
export class UserCareer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  year: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'CASCADE',
  })
  @Column('int')
  userId: number;

  @ManyToOne(() => Career, (career) => career.careerId, {
    onDelete: 'CASCADE',
  })
  @Column('int')
  careerId: number;
}
