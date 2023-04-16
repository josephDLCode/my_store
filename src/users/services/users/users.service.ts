import { Model } from 'mongoose'
import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'

import { User } from '../../entities/user.entity'
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto'
import { ProductsService } from 'src/products/services/products/products.service'

@Injectable()
export class UsersService {
  constructor(
    /* private productsService: ProductsService,
    private configService: ConfigService, */
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  findAll() {
    /* const apiKey = this.configService.get('API_KEY')
    const dbName = this.configService.get('DATABASE_NAME')
    console.log(apiKey, dbName)
    return this.users */
    return this.userModel.find().exec()
  }

  async findOne(id: string) {
    return this.userModel.findById(id)
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec()
  }

  async create(data: CreateUserDto) {
    const newUser = new this.userModel(data)
    const hashPassword = await bcrypt.hash(newUser.password, 10)
    newUser.password = hashPassword
    const model = await newUser.save()
    const { password, ...modelRest } = model.toJSON()
    return modelRest
  }

  update(id: string, changes: UpdateUserDto) {
    return this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec()
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }

  async getOrderByUser(userId: string) {
    const user = await this.userModel.findOne({ _id: userId }).exec()
    return {
      date: new Date(),
      user,
      // products: this.productsService.findAll(),
      products: []
    }
  }
}
