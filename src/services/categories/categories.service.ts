import { Injectable, NotFoundException } from '@nestjs/common'
import {
  CreateCategoryDto,
  UpdateCategoryDto
} from '../../dtos/categories.dtos'

@Injectable()
export class CategoriesService {
  private categories = [
    {
      id: 1,
      name: 'Category 1',
      description: 'description 1'
    }
  ]

  findAll() {
    return this.categories
  }

  findOne(id: number) {
    const category = this.categories.find((category) => category.id === id)
    if (!category) throw new NotFoundException(`Product #${id} not found`)
    return category
  }

  create(payload: CreateCategoryDto) {
    const newProduct = { ...payload, id: this.categories.length + 1 }
    this.categories.push(newProduct)
    return newProduct
  }

  update(id: number, payload: UpdateCategoryDto) {
    const category = this.findOne(id)
    const index = this.categories.findIndex((category) => category.id === id)
    this.categories.splice(index, 1, { ...category, ...payload })
    return category
  }

  remove(id: number) {
    const category = this.findOne(id)
    const index = this.categories.findIndex((category) => category.id === id)
    this.categories.splice(index, 1)
    return category
  }
}
