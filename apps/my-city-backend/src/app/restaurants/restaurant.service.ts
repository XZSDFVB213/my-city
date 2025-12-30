import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantEntity } from '@my-city/entities';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(RestaurantEntity.name)
    private restaurantModel: Model<RestaurantEntity>,
    private uploadService:UploadService
  ) {}

  async create(dto: CreateRestaurantDto): Promise<RestaurantEntity> {
    const created = new this.restaurantModel(dto);
    return created.save();
  }

  async findAll(): Promise<RestaurantEntity[]> {
    return this.restaurantModel.find().exec();
  }

  async findOne(id: string): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async update(id: string, dto: UpdateRestaurantDto): Promise<RestaurantEntity> {
    const updated = await this.restaurantModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Restaurant not found');
    
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.restaurantModel.findByIdAndDelete(id).exec();
    if (result.imageUrl) {
    const fileName = result.imageUrl.split('/').pop(); // извлекаем имя файла из URL
    await this.uploadService.deleteFile(fileName);
  }
    if (!result) throw new NotFoundException('Restaurant not found');
  }
}
