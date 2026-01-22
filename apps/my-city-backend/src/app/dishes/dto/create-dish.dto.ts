// apps/my-city-backend/src/app/restaurants/dishes/dto/create-dish.dto.ts
import { DISH_CATEGORIES, DishCategory } from '../dish-categories';
import { IsString, IsOptional, IsNumber, IsMongoId, IsUrl, IsBoolean, IsIn } from 'class-validator';

export class CreateDishDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  price!: number;

  @IsMongoId()
  restaurantId!: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
  
  @IsIn(DISH_CATEGORIES)
  category: DishCategory;
}