import { Module } from '@nestjs/common';
import Products from '../../entities/products.entity';
import Categories from 'src/entities/categories.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederController } from './seeder.cotroller';
import { SeederService } from './seeder.services';
import User from 'src/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Categories, User])],
  controllers: [SeederController],
  providers: [SeederService],
})
export class SeederModule {}
