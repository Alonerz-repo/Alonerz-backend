import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('careers')
export class Career {
  @PrimaryGeneratedColumn()
  careerId: number;

  @Column('varchar')
  careerGroupName: string;

  @Column('varchar')
  careerItemName: string;
}
