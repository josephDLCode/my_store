import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Product } from '../../entities/product.entity'
import { CreateProductDto, UpdateProductDto } from '../../dtos/product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  findAll() {
    return this.productModel.find().exec()
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec()
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    return product
  }

  /* create(payload: CreateProductDto) {
    const newProduct = { ...payload, id: this.products.length + 1 }
    this.products.push(newProduct)
    return newProduct
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id)
    if (product) {
      const index = this.products.findIndex((product) => product.id === id)
      this.products.splice(index, 1, { ...product, ...payload })
      return product
    }

    return null
  }

  remove(id: number) {
    const product = this.findOne(id)
    const index = this.products.findIndex((product) => product.id === id)
    const deletedProduct = this.products[index]
    this.products.splice(index, 1)
    return deletedProduct
  } */
}
