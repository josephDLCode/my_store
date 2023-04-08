import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common'
import { OrdersService } from 'src/users/services/orders/orders.service'
import {
  AddProductsToOrderDto,
  CreateOrderDto,
  UpdateOrderDto
} from 'src/users/dtos/order.dto'
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersServices: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersServices.findAll()
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.ordersServices.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersServices.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateOrderDto
  ) {
    return this.ordersServices.update(id, payload)
  }

  @Put(':id/products')
  updateProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: AddProductsToOrderDto
  ) {
    return this.ordersServices.addProducts(id, payload.productsIds)
  }

  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.ordersServices.remove(id)
  }

  @Delete(':id/product/:productId')
  deleteProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string
  ) {
    return this.ordersServices.removeProduct(id, productId)
  }
}
