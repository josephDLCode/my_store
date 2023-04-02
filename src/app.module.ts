import { Module } from '@nestjs/common'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'

const API_KEY = '123456789'
const API_KEY_PROD = 'PROD_123456789'
@Module({
  imports: [UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    }
  ]
})
export class AppModule {}
