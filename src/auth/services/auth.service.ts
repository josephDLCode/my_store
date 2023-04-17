import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

import { UsersService } from 'src/users/services/users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
