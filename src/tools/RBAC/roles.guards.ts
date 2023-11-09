import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorators'
import { Role } from './role.enum'
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super()
  }


  canActivate(context: ExecutionContext): boolean {
    console.log('Inside canActivate of RolesGuard');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required roles:', requiredRoles);



    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('User from request:', user);

    const hasRole = requiredRoles.some((role) => user.role === role);
    console.log('Has role:', hasRole);

    return hasRole
  }
}