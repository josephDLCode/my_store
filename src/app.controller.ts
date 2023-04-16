import { Controller, Get, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiKeyGuard } from './auth/guards/api-key.guard'

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

  @UseGuards(ApiKeyGuard)
  @Get('nuevo')
  newEndPoint() {
    return {
      message: 'Hola desde nuevo endpoint'
    }
  }
}
