import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_careers')
export class Career {
  // 식별값
  @PrimaryGeneratedColumn()
  public careerId: number;

  // TODO : 사용자 아이디(N to 1)

  // 전문 분야
  @Column('varchar')
  public part: string;

  // 경력
  @Column('varchar')
  public year: string;

  // 한 줄 소개
  @Column('text')
  public description: string;
}
