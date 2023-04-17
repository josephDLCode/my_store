import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/services/users/users.service'
import { PayloadToken } from '../models/token.model'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email)
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const { password, ...userRest } = user.toJSON()
        return userRest
      }
    }
    return null
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id }
    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }
}
