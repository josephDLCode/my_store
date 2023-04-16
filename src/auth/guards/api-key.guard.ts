import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { Reflector } from '@nestjs/core'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPuclic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    )
    if (isPuclic) return true
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header('Auth')
    const isAuth = authHeader === '1234'
    if (!isAuth) throw new UnauthorizedException('No autorizado')
    return isAuth
  }
}
