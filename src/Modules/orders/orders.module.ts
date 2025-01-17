import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controllers';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Order from '../../entities/orders.entity';
import User from 'src/entities/users.entity';
import Products from 'src/entities/products.entity';
import OrderDetails from 'src/entities/orders_details.entity';
import Categories from 'src/entities/categories.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Order, User, Products, OrderDetails, Categories])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}