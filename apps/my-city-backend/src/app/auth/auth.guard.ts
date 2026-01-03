import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-admin-key'];

    if (!token || !this.authService.validateToken(token)) {
      throw new UnauthorizedException('Admin access only');
    }

    
    return true;
  }
}