import { Controller, Get, Param } from '@nestjs/common'
import { CategoriesService } from '../../services/categories/categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategory(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string
  ) {
    return {
      product: productId,
      category: categoryId
    }
  }
}
