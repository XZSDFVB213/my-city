import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { UploadModule } from '../upload/upload.module';
import { DishEntity, DishSchema } from '@my-city/entities';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[UploadModule,MongooseModule.forFeature([{name:DishEntity.name,schema:DishSchema}])],
  providers: [DishesService],
  controllers: [DishesController]
})

export class DishesModule {}
