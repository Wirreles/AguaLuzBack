
import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from "class-validator"
import { Type } from "class-transformer";
import { productArrayDto } from "./productArray.dto";


export class OrderDto {
    /**
      id de un usuario existente
      f47ac10b-58cc-4372-a567-0e02b2c3d479
     **/
    @IsNotEmpty()
    @IsUUID()
    user_id: string

     /**
      debe ser una lista de los productos de la orden
     **/
      @IsNotEmpty()
      @IsArray()
      @ValidateNested({ each: true }) 
      @Type(() => productArrayDto) 
      products: productArrayDto[];
}

