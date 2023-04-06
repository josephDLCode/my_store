import { Db } from 'mongodb'
import { ConfigType } from '@nestjs/config'
import { Injectable, Inject } from '@nestjs/common'

import config from './config'

@Injectable()
export class AppService {
  constructor(
    /* @Inject('API_KEY') private apiKey: string, */
    @Inject('TASKS') private tasks: any[],
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  getHello(): string {
    /* const apiKey = this.config.get<string>('API_KEY')
    const bdName = this.config.get('DATABASE_NAME') */
    const {
      database: { name },
      apiKey
    } = this.configService
    return `Hello World! ${apiKey} ${name}`
  }

  async getTasks() {
    const taskCollection = this.database.collection('tasks')
    const tasks = await taskCollection.find().toArray()
    return tasks
  }
}
