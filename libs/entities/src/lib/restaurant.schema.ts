import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RestaurantEntity extends Document {
  @Prop({ required: false, unique: true })
  slug!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({default: null})
  telegramUsername?: string; // например: my_restaurant_bot или @my_restaurant

  // ИЛИ лучше:
  @Prop({default: null})
  telegramChatId?: string; // например: -1001234567890

  @Prop()
  description?: string;

  @Prop()
  imageUrl?: string;
  
  @Prop({ default: true })
  isActive!: boolean;
  
  @Prop({default:0})
  ordersCount?: number
}

export const RestaurantSchema = SchemaFactory.createForClass(RestaurantEntity);