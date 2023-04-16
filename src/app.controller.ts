import { Controller, Get, UseGuards, SetMetadata } from '@nestjs/common'

import { AppService } from './app.service'
import { ApiKeyGuard } from './auth/guards/api-key.guard'

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    const tasks = await this.appService.getTasks()
    return {
      hello: this.appService.getHello(),
      tasks
    }
  }

  @Get('nuevo')
  @SetMetadata('isPublic', true)
  newEndPoint() {
    return {
      message: 'Hola desde nuevo endpoint'
    }
  }
}
