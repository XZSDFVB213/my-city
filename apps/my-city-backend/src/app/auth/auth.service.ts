import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  // В памяти пока, можно позже заменить на базу
  private tokens: Set<string> = new Set();

  private readonly adminSecret: string;

  constructor() {
    this.adminSecret = process.env.ADMIN_SECRET_KEY || 'secret';
  }

  login(secret: string) {
    if (secret !== this.adminSecret) {
      throw new UnauthorizedException('Доступ только для Админа!');
    }

    const token = crypto.randomUUID();
    this.tokens.add(token);
    return { isAdmin: true, token };
  }

  validateToken(token: string): boolean {
    return this.tokens.has(token);
  }
}
