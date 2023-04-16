import * as Joi from 'joi'
import { lastValueFrom } from 'rxjs'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { HttpModule, HttpService } from '@nestjs/axios'

import config from './config'
import { AppService } from './app.service'
import { environments } from 'src/environments'
import { AppController } from './app.controller'
import { UsersModule } from './users/users.module'
import { ProductsModule } from './products/products.module'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required()
      })
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
    AuthModule
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
