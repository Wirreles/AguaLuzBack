import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import Products from '../../entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Categories from 'src/entities/categories.entity';
import { CategoriesService } from 'src/Modules/categories/categories.service';
import { CloudinaryConfig } from 'src/config/cloudinary';
@Module({
  imports:[TypeOrmModule.forFeature([Products, Categories])],
  controllers: [ProductsController],
  providers: [ProductsService, CategoriesService, CloudinaryConfig]
})
export class ProductsModule {}
