import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  import { IS_PUBLIC_KEY, jwtConstants, REQUEST_TOKEN_PAYLOAD_KEY } from '../constants/constants';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private reflector: Reflector,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) {
        return true;
      }
  
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
     
      try {
       
        const payload = await this.jwtService.verifyAsync(
            token,
            {
              secret: jwtConstants.secret
            }
          );
  
        request[REQUEST_TOKEN_PAYLOAD_KEY] = payload;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
}