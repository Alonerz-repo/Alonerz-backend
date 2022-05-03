import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  // DB에서 모든 카테고리 조회
  async findAllCategories(): Promise<Category[]> {
    return await this.find();
  }
}
