import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderEntity, OrderSchema, RestaurantEntity } from '@my-city/entities';
import { AuthModule } from '../auth/auth.module';
import { TelegramService } from '../../common/telegram/telegram.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrderEntity.name, schema: OrderSchema },
      {name:RestaurantEntity.name,schema:RestaurantEntity}
      ,
    ]),
  
  AuthModule    
  ],
  controllers: [OrdersController],
  providers: [OrdersService,TelegramService],
})
export class OrdersModule {}
