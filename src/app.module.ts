import { Module } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'
import { lastValueFrom } from 'rxjs'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'

@Module({
  imports: [HttpModule, UsersModule, ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get('https://jsonplaceholder.typicode.com/todos')
        const tasks = await lastValueFrom(request)
        return tasks.data
      },
      inject: [HttpService]
    }
  ]
})
export class AppModule {}
