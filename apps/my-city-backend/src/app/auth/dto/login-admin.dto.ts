import { IsString, MinLength } from "class-validator";
export class LoginAdminDto {
    @IsString()
    @MinLength(8)
    secret!: string    
}