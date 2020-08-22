import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const checkPermissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const user = context.switchToHttp().getRequest().user;
    return this.validatePermissions(checkPermissions, user.permissions);
  }

  validatePermissions(perHandler, perUser): boolean {
    if (perUser.includes('creator')) {
      return true;
    }
    for (const i of perHandler) {
      if (!perUser.includes(i)) {
        throw new ForbiddenException('У вас недостаточно прав');
      }
    }
    return true;
  }

}