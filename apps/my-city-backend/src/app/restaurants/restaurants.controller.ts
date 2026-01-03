import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { RestaurantsService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { AdminGuard } from '../auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService, private uploadService:UploadService) {}


  @Post()
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(@Body() dto: CreateRestaurantDto,@UploadedFile() file?: Express.Multer.File) {
    if(file){
      const {url} = await this.uploadService.uploadFile(file);
      dto.imageUrl = url
    }
    return this.restaurantsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.restaurantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('id') id: string, @Body() dto: UpdateRestaurantDto,@UploadedFile() file?: Express.Multer.File) {
    if (file){
      const {url} = await this.uploadService.uploadFile(file);
      dto.imageUrl = url
    }
    return this.restaurantsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id);
  }
}
