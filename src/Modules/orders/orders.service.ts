import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import Order from '../../entities/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../../dto/orders.dto';
import Products from 'src/entities/products.entity';
import User from 'src/entities/users.entity';
import OrderDetails from 'src/entities/orders_details.entity';
import { ProductsDto } from 'src/dto/products.dto';

@Injectable()
export class OrdersService {
 
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
  ) {}

  async getOrders(id: string): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: {
        order_detail: {
          products: true,
        },
      },
    });
    if (!order) throw new BadRequestException('El id de orden es incorrecto');
    return order;
  }

  async addOrders(order: OrderDto) {
    const { user_id, products } = order;
    if (products.length === 0)
      throw new BadRequestException('No hay productos en la orden');
    for (const product of products) {
      if (product) {
        const producto: Products = await this.productRepository.findOneBy({
          id: product.id,
        });
        if (!producto)
          throw new BadRequestException(
            `El producto con id ${product.id} no existe`,
          );
      }
    }
    const user: User = await this.userRepository.findOneBy({ id: user_id });
    if (!user) throw new BadRequestException('El usuario no existe');

    const newOrder: Order = await this.ordersRepository.create({
      user_id: user,
      date: new Date(),
    });

    await this.ordersRepository.save(newOrder);
    const allProductsOrder: Partial<ProductsDto>[] = [];

    let allProductOrderDB: Products[] = await this.productRepository.find()
    for (const product of products){
     let prod = allProductOrderDB.find(e=>e.id == product.id)
     allProductOrderDB = allProductOrderDB.map(e=> {
      if(e.id === prod.id){
        e.stock = prod.stock--;
      }
      return e
    })
    prod = allProductOrderDB.find(e=>e.id == product.id)
    if(prod.stock == 0) {
     throw new BadRequestException("No hay stock de ese producto")
     
     } 
     
     
    }
    let priceTotal = 0;
    for (const product of products) {
      const productItem = await this.productRepository.findOneBy({
        id: product.id,
      });
        priceTotal += Number(productItem.price);
        productItem.stock--;
        await this.productRepository.update(productItem.id, productItem);
        allProductsOrder.push(productItem);
    }
    


    const orderDetail: OrderDetails = await this.orderDetailsRepository.create({
      price: Number(Number(priceTotal).toFixed(2)),
      order_id: newOrder,
      products: allProductsOrder,
    });
    await this.orderDetailsRepository.save(orderDetail);

    const updateOrder: Order = await this.ordersRepository.findOneBy({
      id: newOrder.id,
    });
    updateOrder.order_detail = orderDetail;
    await this.ordersRepository.save(updateOrder);

    return this.ordersRepository.findOne({
      where: { id: updateOrder.id },
      relations: {
        order_detail: true,
      },
    });
    
  }
}
