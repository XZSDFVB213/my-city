import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantEntity } from '@my-city/entities';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { UploadService } from '../upload/upload.service';
import { mapMongoId } from '../../common/mappers/mongo.mapper';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(RestaurantEntity.name)
    private restaurantModel: Model<RestaurantEntity>,
    private uploadService:UploadService
  ) {}

  async create(dto: CreateRestaurantDto): Promise<RestaurantEntity> {
    const created = new this.restaurantModel(dto);
    await created.save();
    return mapMongoId(created);
  }

  async findAll(): Promise<RestaurantEntity[]> {
    const restaurants = await this.restaurantModel.find().exec();
    return restaurants.map(mapMongoId);
  }

  async findOne(id: string): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantModel.findById(id).exec();
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return mapMongoId(restaurant);
  }

  async update(id: string, dto: UpdateRestaurantDto): Promise<RestaurantEntity> {
    const updated = await this.restaurantModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!updated) throw new NotFoundException('Restaurant not found');
    
    return mapMongoId(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.restaurantModel.findByIdAndDelete(id).exec();
    if (result.imageUrl) {
    const fileName = result.imageUrl.split('/').pop(); // извлекаем имя файла из URL
    await this.uploadService.deleteFile(fileName);
  }
    if (!result) throw new NotFoundException('Restaurant not found');
  }
  async findPopular(): Promise<RestaurantEntity[]> {
    const restaurants = await this.restaurantModel.find().sort({ rating: -1 }).limit(6).exec();
    
    return restaurants.map(mapMongoId);
  }
}
