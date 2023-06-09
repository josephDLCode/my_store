import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsModule } from 'src/products/products.module'
import { CustomersController } from './controllers/customers/customers.controller'
import { UsersController } from './controllers/users/users.controller'
import { CustomersService } from './services/customers/customers.service'
import { UsersService } from './services/users/users.service'
import { Customer, CustomerSchema } from './entities/customer.entity'
import { User, UserSchema } from './entities/user.entity'
import { Order, OrderSchema } from './entities/order.entity'
import { OrdersService } from './services/orders/orders.service'
import { OrdersController } from './controllers/orders/orders.controller'

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
      { name: User.name, schema: UserSchema },
      { name: Order.name, schema: OrderSchema }
    ])
  ],
  controllers: [CustomersController, UsersController, OrdersController],
  providers: [CustomersService, UsersService, OrdersService],
  exports: [UsersService]
})
export class UsersModule {}
