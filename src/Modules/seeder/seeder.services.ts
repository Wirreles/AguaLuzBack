import {
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import * as data from '../../utils/ecommerce-products.json';
import * as user from '../../utils/ecommerce-user.json';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Products from 'src/entities/products.entity';
import Categories from 'src/entities/categories.entity';
import User from 'src/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async addProductSeeder() {
    let arrProducts: Products['name'][] = [];
    
    const products = await this.productRepository.find({
      relations: { orden_details: true },
    });
    
    for (const product of products) {
      if (product.orden_details.length > 0) {
        arrProducts.push(product.name);
      } else {
        await this.productRepository.delete(product.id);
      }
    }
    
    for (const product of data) {
      let foundMatch = false;
      for (const name of arrProducts) {
        if (product.name === name) {
          foundMatch = true;
          break;
        }
      }
      if (foundMatch) {
        continue;
      }
    
      const category = await this.categoriesRepository.findOne({
        where: { name: product.category },
      });
      const newProduct = new Products();
      newProduct.name = product.name;
      newProduct.description = product.description;
      newProduct.price = product.price;
      newProduct.stock = product.stock;
      newProduct.imgUrl = product.imgUrl;
      newProduct.category = category;
  
      await this.productRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(newProduct)
        .orUpdate(['description', 'price', 'stock', 'imgUrl'], ['name'])
        .execute();
    }
    if(arrProducts){
      return { message: 'Productos cargados exitosamente', products: `Estos son los productos que pertenecen a una orden => ${arrProducts} `};
    } else {
      return { message: 'Productos cargados exitosamente'}
    }

  }

  async addCategoriesSeeder() {
    for (const element of data) {
      await this.categoriesRepository
        .createQueryBuilder()
        .insert()
        .into(Categories)
        .values({ name: element.category })
        .orIgnore()
        .execute();
    }
  }

  async addUserSeeder() {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.userRepository.save({ ...user, password: hashedPassword });
  }

  async onModuleInit() {
    const userName = await this.userRepository.findOne({where:{name:user.name}})
    if(!userName){
      await this.addUserSeeder();
    }

    const categories = await this.categoriesRepository.find();
    if (categories.length === 0) {
      await this.addCategoriesSeeder();
    }

    const products = await this.productRepository.find();
    if (products && products.length === 0) {
      await this.addProductSeeder();
    }
  }
}
