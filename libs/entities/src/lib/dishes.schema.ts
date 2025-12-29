// libs/entities/lib/src/dishes.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class DishEntity extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId!: Types.ObjectId;

  @Prop()
  imageUrl?: string;

  @Prop({ default: true })
  isActive!: boolean;
}

export const DishSchema = SchemaFactory.createForClass(DishEntity);
