import { User } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('blocks')
export class Block {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  userId: string;

  @ManyToOne(() => User, (user) => user.userId, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'otherId' })
  otherId: string;
}
