import OrderDetails from "src/entities/orders_details.entity";
import User from "src/entities/users.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name:"orders"
})
class Order {
    /**
     * Identificador único de la orden en formato UUID.
     * @example "3e4e3766-8b30-4bb7-b8a7-9e2dcf27e9db"
     */
    @PrimaryGeneratedColumn('uuid')
    id: string

    /**
     * Usuario que realizó la orden.
     */
    @ManyToOne(() => User, user => user.orders_id )
    user_id: User

    /**
     * Fecha en que se realizó la orden.
     * @example "2024-05-09T12:00:00.000Z"
     */
    @Column()
    date: Date;

    /**
     * Detalles específicos de la orden.
     */
    @OneToOne(() => OrderDetails , (orderDetails) => orderDetails.order_id)
    order_detail: OrderDetails

}

export default Order
