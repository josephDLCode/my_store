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
    return this.orderModel.find().exec()
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
}
