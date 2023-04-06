import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, NotFoundException } from '@nestjs/common'

import { Product } from '../../entities/product.entity'
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto
} from '../../dtos/product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  findAll(params?: FilterProductDto) {
    if (params) {
      const { limit, offset } = params
      return this.productModel.find().skip(offset).limit(limit).exec()
    }
    return this.productModel.find().exec()
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec()
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    return product
  }

  create(payload: CreateProductDto) {
    const newProduct = new this.productModel(payload)
    return newProduct.save()
  }

  update(id: string, payload: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec()
    if (!product) throw new NotFoundException(`Product #${id} not found`)

    return product
  }

  remove(id: string) {
    return this.productModel.findByIdAndDelete(id)
  }
}
