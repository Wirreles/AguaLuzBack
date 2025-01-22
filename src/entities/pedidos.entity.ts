import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Clientes from "./clientes.entity";
import Zonas from "./zonas.entity";
import Repartidores from "./repartidores.entity";
import ProductosPedidos from "./productos_pedidos.entity";

@Entity({ name: "pedidos" })
class Pedidos {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  idPedido: string;

  /**
   * Número de pedido
   * @example 12345
   */
  @Column({ type: "int", nullable: false })
  nroPedido: number;

  /**
   * Cliente que realiza el pedido
   */
  @ManyToOne(() => Clientes, (cliente) => cliente.pedidos)
  @JoinColumn({ name: "idCliente" })
  cliente: Clientes;

  /**
   * Fecha y hora de entrada del pedido
   * @example "2024-01-20T10:30:00"
   */
  @Column({ type: "timestamp", nullable: false })
  entrada: Date;

  /**
   * Fecha y hora de envío del pedido
   * @example "2024-01-20T14:00:00"
   */
  @Column({ type: "timestamp", nullable: true })
  enviar: Date;

  /**
   * Fecha y hora de salida del pedido
   * @example "2024-01-20T14:30:00"
   */
  @Column({ type: "timestamp", nullable: true })
  salida: Date;

  /**
   * Indica si el pedido ha sido despachado
   * @example true
   */
  @Column({ type: "boolean", default: false })
  despachado: boolean;

  /**
   * Observaciones del pedido
   * @example Entregar sin falta antes de las 15:00
   */
  @Column({ type: "text", nullable: true })
  observaciones: string;

  /**
   * Zona asociada al pedido
   */
  @ManyToOne(() => Zonas, (zona) => zona.pedidos)
  @JoinColumn({ name: "idZona" })
  zona: Zonas;

  /**
   * Importe total del pedido
   * @example 1500.50
   */
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  importe: number;

  /**
   * Repartidor asignado al pedido
   */
  @ManyToOne(() => Repartidores, (repartidor) => repartidor.pedidos)
  @JoinColumn({ name: "idRepartidor" })
  repartidor: Repartidores;

  /**
   * Indica con cuánto dinero pagará el cliente
   * @example 2000
   */
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  pagaCon: number;

  /**
   * Línea del pedido
   * @example Línea 1
   */
  @Column({ type: "varchar", length: 50, nullable: true })
  linea: string;

  /**
   * Talonario asociado al pedido
   * @example Talonario 5
   */
  @Column({ type: "varchar", length: 50, nullable: true })
  talonario: string;

  /**
   * Descuento aplicado al pedido
   * @example 10.5
   */
  @Column({ type: "decimal", precision: 5, scale: 2, nullable: true })
  descuento: number;

  /**
   * Nombre del destinatario del pedido
   * @example Juan Perez
   */
  @Column({ type: "varchar", length: 100, nullable: true })
  nombre: string;

  /**
   * Productos incluidos en el pedido
   */
  @OneToMany(() => ProductosPedidos, (productosPedidos) => productosPedidos.pedido)
  productosPedidos: ProductosPedidos[];
}

export default Pedidos;
