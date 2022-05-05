import { Controller, Get } from '@nestjs/common';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // 모든 카테고리 불러오기
  @Get()
  async getAllCategories(): Promise<{ categories: Category[] }> {
    const categories = await this.categoryService.getAllCategories();
    return { categories };
  }
}
