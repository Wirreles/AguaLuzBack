import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Order from "./orders.entity";
import Products from "src/entities/products.entity";

@Entity({
    name:"order_details"
})
class OrderDetails {

    /**
     * Identificador único del detalle de la orden en formato UUID.
     * @example "3e4e3766-8b30-4bb7-b8a7-9e2dcf27e9db"
     */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /**
     * Precio del detalle de la orden.
     * @example "25.50"
     */
    @Column({
        type: "decimal"
    })
    price: number

    /**
     * Orden a la que pertenece este detalle.
     */
    @OneToOne(() => Order, (order)=> order.order_detail)
    @JoinColumn({name:'order_id'})
    order_id: Order

    /**
     * Productos incluidos en este detalle de la orden.
     */
    @ManyToMany(() => Products, products => products.orden_details)
    @JoinTable({
        name: 'orderdetails_products',
        joinColumn:{
            name: 'product_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn:{
            name: 'orderdetail_id',
            referencedColumnName: 'id'
        }
    })
    products: Products[]
}

export default OrderDetails
