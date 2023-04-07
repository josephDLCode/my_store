import { ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe
} from '@nestjs/common'

import { UsersService } from '../../services/users/users.service'
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto'
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  get(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.findOne(id)
  }

  @Get(':id/orders')
  async getOrders(@Param('id', MongoIdPipe) id: string) {
    return await this.usersService.getOrderByUser(id)
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload)
  }

  @Put(':id')
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload)
  }

  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.usersService.remove(id)
  }
}
