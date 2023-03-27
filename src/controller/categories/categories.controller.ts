import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Body,
  Put,
  Delete
} from '@nestjs/common'
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dtos'
import { CategoriesService } from 'src/services/categories/categories.service'

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  getCategories(
    @Query('limit') limit = 200,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    return this.categoriesService.findAll()
  }

  @Get(':categoryId')
  getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoriesService.findOne(categoryId)
  }

  @Post()
  createCategory(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload)
  }

  @Put(':categoryId')
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto
  ) {
    return this.categoriesService.update(categoryId, payload)
  }

  @Delete(':categoryId')
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    this.categoriesService.remove(categoryId)
  }
}
