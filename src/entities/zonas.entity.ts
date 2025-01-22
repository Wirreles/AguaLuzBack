import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Clientes from "./clientes.entity";
import Pedidos from "./pedidos.entity";

@Entity({ name: "zonas" })
class Zonas {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  idZona: string;

  /**
   * Nombre de la zona
   * @example Zona Norte
   */
  @Column({ type: "varchar", length: 100, nullable: false })
  zona: string;

  /**
   * Descripción de la zona
   * @example Zona de envíos urgentes
   */
  @Column({ type: "text", nullable: true })
  descripcion: string;

  /**
   * Indica si la zona está activa
   * @example true
   */
  @Column({ type: "boolean", default: true })
  activa: boolean;

  /**
   * Lista de clientes asociados a la zona
   */
  @OneToMany(() => Clientes, (cliente) => cliente.zona)
  clientes: Clientes[];

  /**
   * Lista de pedidos asociados a la zona
   */
  @OneToMany(() => Pedidos, (pedido) => pedido.zona)
  pedidos: Pedidos[];
}

export default Zonas;
