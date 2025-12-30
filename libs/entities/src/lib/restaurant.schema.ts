import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class RestaurantEntity extends Document {
  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: false })
  telegramChatId?: string;

  @Prop()
  description?: string;

  @Prop()
  imageUrl?: string;
  
  @Prop({ default: true })
  isActive!: boolean;
}

export const RestaurantSchema = SchemaFactory.createForClass(RestaurantEntity);