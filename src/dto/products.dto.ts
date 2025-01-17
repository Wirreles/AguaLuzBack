import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import Categories from 'src/entities/categories.entity';

export class ProductsDto {

   @ApiHideProperty()
   @IsUUID()
   @IsOptional()
   id:string
   
    /**
    * es un string de 50 caracteres como mucho, tiene que ser unico, y tiene que existir si o si
     * @example Escobillon
     */
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  /**
   * descripcion del producto
   * @example Sirve para barrer
   */
  @IsNotEmpty()
  @IsString()
  @Length(10, 280)
  description: string;

       /**
     * preciop unitario del producto
     * @example "15.00"
     */
  @IsNotEmpty()
  @IsDecimal()
  price: number;

      /**
     * stock del producto
     * @example 24
     */
  @IsInt()
  @IsNotEmpty()
  stock: number;

     /**
     * imagen del producto
     * @example https://asset.cloudinary.com/dz6mvpwwd/3682dadf42e9245f0f26ed842dbbe9c4
     */
  @IsString()
  imgUrl: string;

  /**
   * categoria asignada al crear el producto
   * @example smarthpone
   */
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @IsEmpty()
  @ApiHideProperty()
  category: Categories;
}
