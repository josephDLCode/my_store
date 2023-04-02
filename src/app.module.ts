import { lastValueFrom } from 'rxjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule, HttpService } from '@nestjs/axios'

import { AppService } from './app.service'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'
import { environments } from 'src/environments'
import config from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule
  ],
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
