import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({})
export class OrderItemEntity {
  @Prop({ required: true })
  dishId!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  quantity!: number;
}

@Schema({ timestamps: true })
export class OrderEntity extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Restaurant', required: true })
  restaurantId!: Types.ObjectId;

  @Prop({ type: [OrderItemEntity], required: true })
  items!: OrderItemEntity[];

  @Prop({ required: true })
  totalPrice!: number;

  @Prop({
    enum: ['pending', 'confirmed', 'completed'],
    default: 'pending',
  })
  status!: 'pending' | 'confirmed' | 'completed';
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);
