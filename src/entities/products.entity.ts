import { ApiHideProperty } from "@nestjs/swagger"
import Categories from "src/entities/categories.entity"
import OrderDetails from "src/entities/orders_details.entity"
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name:'products'
})
class Products {

    @ApiHideProperty()
    @PrimaryGeneratedColumn('uuid')
    id:string

    /**
     * es un string de 50 caracteres como mucho, tiene que ser unico, y tiene que existir si o si
     * @example Trapeador
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true
    })
    name: string

      /**
     * descripcion del producto
     * @example Se utilza para limpiar el piso
     */
    @Column({
        type: 'text',
        nullable: false
    })
    description: string

       /**
     * preciop unitario del producto
     * @example "15.00"
     */
    @Column({
        type: 'decimal',
        precision:10,
        scale: 2,
        nullable: false
    })
    price: number

       /**
     * stock del producto
     * @example 24
     */
    @Column({
        type: 'int',
        nullable:false
    })
    stock: number

       /**
     * imagen del producto
     * @example https://asset.cloudinary.com/dz6mvpwwd/3682dadf42e9245f0f26ed842dbbe9c4
     */
    @Column({
        default: "https://asset.cloudinary.com/dz6mvpwwd/3682dadf42e9245f0f26ed842dbbe9c4"
    })
    imgUrl: string

         /**
     * id de la categoria del producto
     */
    @ManyToOne(()=> Categories,(categori)=>categori.products)
    @JoinColumn({name: 'category_id'})
    category: Categories

         /**
     * arreglo con los detalles de las ordenes a la que pertenece el producto
     */
    @ManyToMany(()=> OrderDetails, (order_details)=> order_details.products)
    orden_details: OrderDetails[];
}

export default Products