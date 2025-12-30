import {Controller, Body, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import { LoginAdminDto } from './dto/login-admin.dto';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('admin/login')
    /**
     * Login as admin user
     * @param {string} secret - admin user secret
     * @returns {Promise<{isAdmin: boolean, token: string}>}
     */
    async login(@Body() dto:LoginAdminDto,): Promise<{ isAdmin: boolean, token: string}> {
        return this.authService.login(dto.secret);

    }
}


