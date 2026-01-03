import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OrderEntity } from '@my-city/entities';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { mapMongoId } from '../../common/mappers/mongo.mapper';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(OrderEntity.name)
    private orderModel: Model<OrderEntity>,
  ) {}

  async create(dto: CreateOrderDto): Promise<OrderEntity> {
    const created = new this.orderModel(dto);
    return mapMongoId(created).save();
  }
  async findByStatus(status: 'pending' | 'confirmed' | 'completed') {
    return this.orderModel.find({ status }).exec();
  }
  async findAll(): Promise<OrderEntity[]> {
    const orders = await this.orderModel.find().exec();
    return orders.map(mapMongoId);
  }

  async findByRestaurant(restaurantId: string): Promise<OrderEntity[]> {
    const restaurant = await this.orderModel
      .find({ restaurantId: new Types.ObjectId(restaurantId) })
      .exec();
    return restaurant.map(mapMongoId);
  }

  async findOne(id: string): Promise<OrderEntity> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) throw new NotFoundException('Order not found');
    return mapMongoId(order);
  }

  async update(id: string, dto: UpdateOrderDto): Promise<OrderEntity> {
    const updated = await this.orderModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Order not found');
    return mapMongoId(updated);
  }
  async confirm(id: string): Promise<OrderEntity> {
    return this.update(id, { status: 'confirmed' });
  }

  async complete(id: string): Promise<OrderEntity> {
    return this.update(id, { status: 'completed' });
  }

  async remove(id: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Order not found');
  }
}
