import { MongoClient } from 'mongodb'
import { ConfigType } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { Module, Global } from '@nestjs/common'

import config from '../config'

const API_KEY = '123456789'
const API_KEY_PROD = 'PROD_123456789'

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { password, host, username, port, name } = configService.database
        const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`
        return {
          uri,
          user: username,
          pass: password,
          dbName: name
        }
      },
      inject: [config.KEY]
    })
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { password, host, username, port, name } = configService.database
        const uri = `mongodb://${username}:${password}@${host}:${port}/?authSource=admin&readPreference=primary`
        const client = new MongoClient(uri)
        await client.connect()
        const database = client.db(name)
        return database
      },
      inject: [config.KEY]
    }
  ],
  exports: ['API_KEY', 'MONGO']
})
export class DatabaseModule {}
