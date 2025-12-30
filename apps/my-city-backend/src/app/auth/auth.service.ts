import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly adminSecretHash: string;

  constructor() {
    const secret = process.env.ADMIN_SECRET_KEY;
    if (!secret) {
      throw new Error('ADMIN_SECRET_KEY is not defined');
    }
    this.adminSecretHash = this.hash(secret);
  }

  private hash(secret: string) {
    return crypto.createHash('sha256').update(secret).digest('hex');
  }
  validateAdmin(secret: string): boolean {
    const incomingHash = this.hash(secret);
    return incomingHash === this.adminSecretHash;
  }
  login(secret: string) {
    const isValid = this.validateAdmin(secret);
    if (!isValid) {
      throw new UnauthorizedException('Доступ только для Админа!');
    }
    const token = crypto.randomUUID();
    return { isAdmin: true, token };
  }
}
