import { DishEntity } from '@my-city/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { UploadService } from '../upload/upload.service';
import { mapMongoId } from '../../common/mappers/mongo.mapper';

@Injectable()
export class DishesService {
  constructor(
    @InjectModel(DishEntity.name) private dishModel: Model<DishEntity>,
    private uploadService:UploadService
  ) {}

  async create(dto: CreateDishDto): Promise<DishEntity> {
    const created = new this.dishModel(dto);
    await created.save();
    return mapMongoId(created);
  }
  async remove(id: string): Promise<void> {
    const result = await this.dishModel.findByIdAndDelete(id).exec();
    if (result.imageUrl) {
      const fileName = result.imageUrl.split('/').pop(); // извлекаем имя файла из URL
      await this.uploadService.deleteFile(fileName);
    }
    if (!result) throw new NotFoundException('Dish not found');
  }
  async update(id: string, dto: UpdateDishDto): Promise<DishEntity> {
    const updated = await this.dishModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Dish not found');
    return mapMongoId(updated);
  }
  async findAll(): Promise<DishEntity[]> {
    const dishes = await this.dishModel.find().exec();
    return dishes.map(mapMongoId);
  }
  async findOne(id: string): Promise<DishEntity> {
    const dish = await this.dishModel.findById(id).exec();
    if (!dish) throw new NotFoundException('Dish not found');
    return mapMongoId(dish);
  }
  async getByRestaurantId(restaurantId: string): Promise<DishEntity[]> {
  const dishes = await this.dishModel.find({ restaurantId }).exec();
  console.log(dishes); // теперь должно показать блюда
  return dishes.map(mapMongoId);
}
}
