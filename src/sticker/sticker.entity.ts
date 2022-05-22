import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stickers')
export class Sticker {
  @PrimaryGeneratedColumn()
  stickerId: number;

  @Column('varchar')
  stickerUrl: string;

  @Column('int')
  stickerOrder: number;

  @ManyToOne(() => User, (user) => user.userId, { onDelete: 'CASCADE' })
  userId: string;
}
