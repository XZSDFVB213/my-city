import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderEntity, OrderSchema } from '@my-city/entities';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderEntity.name, schema: OrderSchema },
    ]),
  AuthModule    
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
