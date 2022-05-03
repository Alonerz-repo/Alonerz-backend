import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  categoryName: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
