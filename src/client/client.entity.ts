import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  socketId: string;

  @Column('varchar')
  userId: string;
}
