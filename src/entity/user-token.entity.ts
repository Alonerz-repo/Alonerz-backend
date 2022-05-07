import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('user_token')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  userId: number;

  @Column('varchar')
  kakaoId: string;

  @Column('varchar')
  refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;
}
