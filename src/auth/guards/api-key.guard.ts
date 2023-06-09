import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { ConfigType } from '@nestjs/config'

import config from '../../config'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPuclic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler()
    )
    if (isPuclic) return true
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header('Auth')
    const isAuth = authHeader === this.configService.apiKey
    if (!isAuth) throw new UnauthorizedException('No autorizado')
    return isAuth
  }
}
