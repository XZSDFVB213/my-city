import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AdminGuard } from '../auth/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // 🟢 ПУБЛИЧНО
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @UseGuards(AdminGuard)
  @Get('status')
  findByStatus(@Query('status') status: 'pending' | 'confirmed' | 'completed') {
    return this.ordersService.findByStatus(status);
  }

  @UseGuards(AdminGuard)
  @Get('restaurant/:restaurantId')
  findByRestaurant(@Param('restaurantId') restaurantId: string) {
    return this.ordersService.findByRestaurant(restaurantId);
  }

  @UseGuards(AdminGuard)
  @Patch(':id/confirm')
  confirm(@Param('id') id: string) {
    return this.ordersService.confirm(id);
  }

  @UseGuards(AdminGuard)
  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.ordersService.complete(id);
  }

  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
}
