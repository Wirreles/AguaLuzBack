import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import Categories from '../../entities/categories.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getCategories() {
    const categories: Categories[] = await this.categoriesRepository.find();
    if (categories.length === 0) {
      throw new NotFoundException('No Hay Categorias');
    } else {
      return categories;
    }
  }
}
