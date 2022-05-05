import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  // 식별값
  @PrimaryGeneratedColumn()
  categoryId: number;

  // 카테고리명
  @Column()
  categoryName: string;
}
