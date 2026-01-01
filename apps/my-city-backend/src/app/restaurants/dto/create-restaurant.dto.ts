// create-restaurant.dto.ts
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  slug!: string;
  @IsString()
  cuisine: string;
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  imageUrl?: string;
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
