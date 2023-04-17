import { Request } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { Controller, Post, Req, UseGuards } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: any) {
    return req.user
  }
}
