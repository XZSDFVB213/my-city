// create-order.dto.ts
import { IsArray, IsMongoId, IsNumber, IsOptional, ValidateNested, IsEnum, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDto {
  @IsMongoId()
  dishId!: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsNumber()
  quantity!: number;
}

export class CreateOrderDto {
  @IsMongoId()
  restaurantId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items!: OrderItemDto[];

  @IsNumber()
  totalPrice!: number;

  @IsOptional()
  @IsEnum(['pending', 'confirmed', 'completed'])
  status?: string;
}
