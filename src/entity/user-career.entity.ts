import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_career')
export class UserCareer {
  @PrimaryGeneratedColumn()
  careerId: number;

  // 1 : N userId
  @Column('int')
  userId: number;

  @Column('varchar')
  part: string;

  @Column('varchar')
  year: string;

  @Column('text')
  description: string;
}
