import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports:[UploadModule],
  providers: [DishesService],
  controllers: [DishesController]
})
export class DishesModule {}
