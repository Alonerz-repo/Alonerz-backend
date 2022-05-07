import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('user_block')
export class UserBlock {
  @PrimaryGeneratedColumn()
  id: number;

  // 1 : N userId
  @Column('int')
  userId: number;

  // 1 : N userId
  @Column('int')
  blockId: number;
}
