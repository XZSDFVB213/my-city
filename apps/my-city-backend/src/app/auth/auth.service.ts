import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly adminSecret: string;

  constructor() {
    this.adminSecret = process.env.ADMIN_SECRET_KEY || 'secret';
  }

  private hashSecret(secret: string): string {
    return crypto
      .createHash('sha256')
      .update(secret)
      .digest('hex');
  }

  login(secret: string) {
    if (secret !== this.adminSecret) {
      throw new UnauthorizedException('Доступ только для Админа!');
    }

    return {
      isAdmin: true,
      token: this.hashSecret(this.adminSecret),
    };
  }

  validateToken(token: string): boolean {
    const expected = this.hashSecret(this.adminSecret);
    return token === expected;
  }
}