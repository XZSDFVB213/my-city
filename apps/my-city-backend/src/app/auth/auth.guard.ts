import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const adminKey = request.headers['x-admin-key'];
    const secret = this.configService.get<string>('ADMIN_SECRET_KEY');

    if (!adminKey || adminKey !== secret) {
      throw new UnauthorizedException('Admin access only');
    }

    return true;
  }
}
