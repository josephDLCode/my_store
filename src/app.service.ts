import { Injectable, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import config from './config'

@Injectable()
export class AppService {
  constructor(
    /* @Inject('API_KEY') private apiKey: string, */
    @Inject('TASKS') private tasks: any[],
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
}
