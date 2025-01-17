import { IsNotEmpty, IsUUID } from "class-validator";


export class productArrayDto {

    @IsUUID()
    @IsNotEmpty()
    id:string

}