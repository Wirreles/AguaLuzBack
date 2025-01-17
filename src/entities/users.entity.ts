import Order from "src/entities/orders.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity({name:'users'})
class User {
    /**
     * Identificador único del usuario en formato UUID.
     */
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    /**
     * Nombre del usuario.
     * @example John Doe
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable: false
    })
    name: string
    
    /**
     * Contraseña del usuario.
     * @example password123
     */
    @Column({
        type: 'varchar',
        length: 70,
        nullable: false
    })
    password: string
    
    /**
     * Correo electrónico del usuario. Debe ser único.
     * @example john@example.com
     */
    @Column({
        unique:true,
        type: 'varchar',
        length: 50,
        nullable: false
    })
    email: string
    
    /**
     * Número de teléfono del usuario.
     * @example 1234567890
     */
    @Column({
        type: 'int',
        nullable: false
    })
    phone: number
    
    /**
     * Dirección del usuario.
     * @example 123 Main St
     */
    @Column({
        type: 'varchar',
        nullable: false
    })
    address: string

    /**
     * País del usuario.
     * @example United Estates
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable:true
    })
    country: string 

    /**
     * Ciudad del usuario.
     * @example New York
     */
    @Column({
        type: 'varchar',
        length: 50,
        nullable:true
    })
    city: string

    /**
     * Órdenes realizadas por el usuario.
     */
    @OneToMany(()=> Order, (order) => order.user_id)
    orders_id: Order[];

    /**
     * Rol del usuario, por defecto es 'admin'.
     * @example admin
     */
    @Column({
        type: 'varchar',
        default: "user", 
        nullable: false
    })
    isAdmin: string
}

export default User
