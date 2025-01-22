import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Pedidos from "./pedidos.entity";

@Entity({ name: "talonarios" })
class Talonarios {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  numero: string;

  /**
   * Fecha de inicio del talonario
   * @example "2025-01-20"
   */
  @Column({ type: "date", nullable: false })
  inicio: Date;

  /**
   * Observaciones del talonario
   * @example "Talonario correspondiente al mes de enero"
   */
  @Column({ type: "text", nullable: true })
  observaciones: string;

  /**
   * Relación con Pedidos (One-to-Many)
   */
  @OneToMany(() => Pedidos, (pedido) => pedido.talonario)
  pedidos: Pedidos[];
}

export default Talonarios;
