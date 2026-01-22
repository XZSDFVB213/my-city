import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DishesService } from './dishes.service';
import { UploadService } from '../upload/upload.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { AdminGuard } from '../auth/auth.guard';
import { DISH_CATEGORIES } from './dish-categories';

@Controller('dishes')
export class DishesController {
  constructor(
    private readonly dishesService: DishesService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() dto: CreateDishDto, @UploadedFile() file?: any) {
    if (file) {
      const { url } = await this.uploadService.uploadFile(file);
      dto.imageUrl = url;
    }
    return this.dishesService.create(dto);
  }

  @Get()
  findAll() {
    return this.dishesService.findAll();
  }
  @Get('categories')
  getCategories() {
    return DISH_CATEGORIES;
  }
  @Get('restaurants/:restaurantId/dishes')
  getByRestaurantId(@Param('restaurantId') restaurantId: string) {
    return this.dishesService.getByRestaurantId(restaurantId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateDishDto,
    @UploadedFile() file?: any,
  ) {
    if (file) {
      const { url } = await this.uploadService.uploadFile(file);
      dto.imageUrl = url;
    }
    return this.dishesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.dishesService.remove(id);
  }
}
