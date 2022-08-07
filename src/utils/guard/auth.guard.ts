import { Request } from 'express';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private validateRequest(request: any) {
    const authorization = request.headers.authorization;
    const bearerToken = (authorization || 'Bearer ').split('Bearer ')[1];
    request.user = this.authService.verifyToken(bearerToken);
    return true;
  }
}
