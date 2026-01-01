import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { UploadModule } from '../upload/upload.module';
import { DishEntity, DishSchema } from '@my-city/entities';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports:[UploadModule,MongooseModule.forFeature([{name:DishEntity.name,schema:DishSchema}]),AuthModule],
  providers: [DishesService],
  controllers: [DishesController]
})

export class DishesModule {}
