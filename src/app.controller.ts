import { Controller, Get, UseGuards } from '@nestjs/common'

import { AppService } from './app.service'
import { ApiKeyGuard } from './auth/guards/api-key.guard'
import { Public } from './auth/decorators/public.decorator'

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
  @Public()
  newEndPoint() {
    return {
      message: 'Hola desde nuevo endpoint'
    }
  }
}
