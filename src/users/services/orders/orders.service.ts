import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Order } from 'src/users/entities/order.entity'
import { CreateOrderDto } from 'src/users/dtos/order.dto'
import { UpdateOrderDto } from 'src/users/dtos/order.dto'

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel.find().populate(['products', 'customer'])
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id)
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data)
    return newOrder.save()
  }

  update(id: string, changes: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id)
  }

  async removeProduct(id: string, productId: string) {
    // usado para un remover producto de un carrito de compras
    const order = await this.orderModel.findById(id)
    order.products.pull(productId) // Remove product from order
    return order.save()
  }

  async addProducts(id: string, productIds: string[]) {
    const order = await this.orderModel.findById(id)
    order.products.push(...productIds) // Add products to order
    return order.save()
  }
}
