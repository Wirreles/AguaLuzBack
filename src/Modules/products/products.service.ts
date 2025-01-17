import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Products from '../../entities/products.entity';
import { Repository } from 'typeorm';
import Categories from 'src/entities/categories.entity';
import { ProductsDto } from 'src/dto/products.dto';
import { UploadApiResponse, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Products) private productRepository: Repository<Products>,
    @InjectRepository(Categories)
    private categoriesRepository: Repository<Categories>,
  ) {}

  async getProducts(page: number, limit: number): Promise<Products[]> {
    const product: Products[] = await this.productRepository.find({
      relations: { category: true },
    });
    if (product.length === 0) {
      throw new NotFoundException('No hay Productos');
    }
    const start = (page - 1) * limit;
    const end = start + limit;
    const productList: Products[] = product.slice(start, end);
    const productStock: Products[] = productList.filter(
      (product) => product.stock !== 0,
    );
    if (productStock.length === 0) {
      throw new NotFoundException('No hay stock de ningun Producto');
    }
    return productStock;
  }

  async getProductById(id: string): Promise<Products> {
    const product = await this.productRepository.findOneBy({ id });
    if(!product){
      throw new NotFoundException('No existe el producto')
    }
    return product;
  }

  async updateProduct(id: string, product: ProductsDto): Promise<Object> {
    const producto: Products = await this.productRepository.findOneBy({ id });
    if (!producto)
      throw new NotFoundException('El id del Producto es incorrecto');
    const {category_name, ...updateProduct} = product  
    await this.productRepository.update(id, updateProduct);
    return { message: 'El producto fue actualizado con Exito!' };
  }

  async deleteProduct(id: string): Promise<Object> {
    const product: Products = await this.productRepository.findOneBy({ id });
    if (!product) throw new BadRequestException('No existe el Producto');
    if(product.orden_details.length >= 1) throw new BadRequestException('El producto pertenece a una orden, no puede ser borrado')
    await this.productRepository.delete({ id });
    return { message: 'Producto Eliminado Exitosamente' };
  }

  async createProduct(product: ProductsDto) {
    const producto = await this.productRepository.findOneBy({
      name: product.name,
    });
    if (producto) {
      producto.stock = producto.stock + 1;
      await this.productRepository.save(producto)
      return { message: 'El Producto ya existe por ende fue sumado al stock' };
    }
    const category: Categories = await this.categoriesRepository.findOneBy({
      name: product.category_name
    });
    if (!category)
      throw new BadRequestException('La categoria elegida es incorrecta');
    product.category = category;
    
    await this.productRepository.save(product);
    return { message: 'El producto se creo correctamente' };
    
  }

  async updateImage(id: string,file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {resource_type: 'auto'},
        async (error, result) => {
          if(error){
            reject(error);
          } else {
            resolve(result);
            await this.productRepository.update(id, {imgUrl: result.secure_url});
          }

        },
      );
      toStream(file.buffer).pipe(upload);
    });    
}
}
