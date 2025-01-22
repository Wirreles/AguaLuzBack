import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Pedidos from "./pedidos.entity";
import Productos from "./productos.entity";

@Entity({ name: "productos_pedidos" })
class ProductosPedidos {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  idProductoPedido: string;

  /**
   * Cantidad de productos en el pedido
   * @example 5
   */
  @Column({ type: "int", nullable: false })
  cantidad: number;

  /**
   * Relación con Pedidos (Many-to-One)
   */
  @ManyToOne(() => Pedidos, (pedido) => pedido.productosPedidos)
  pedido: Pedidos;

  /**
   * Relación con Productos (Many-to-One)
   */
  @ManyToOne(() => Productos, (producto) => producto.productosPedidos)
  producto: Productos;
}

export default ProductosPedidos;
