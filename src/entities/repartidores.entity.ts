import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pedidos from "./pedidos.entity";

@Entity({ name: "repartidores" })
class Repartidores {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  idRepartidor: string;

  /**
   * Nombre del repartidor
   * @example Juan Pérez
   */
  @Column({ type: "varchar", length: 100, nullable: false })
  nombre: string;

  /**
   * Estado del repartidor (activo o inactivo)
   * @example true
   */
  @Column({ type: "boolean", default: true })
  activo: boolean;

  /**
   * Relación con Pedidos (One-to-Many)
   */
  @OneToMany(() => Pedidos, (pedido) => pedido.repartidor)
  pedidos: Pedidos[];
}

export default Repartidores;
