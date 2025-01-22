import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Clientes from "./clientes.entity";

@Entity({ name: "llamadas" })
class Llamadas {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  idLlamada: string;

  /**
   * Cliente asociado a la llamada
   */
  @ManyToOne(() => Clientes, (cliente) => cliente.llamadas)
  @JoinColumn({ name: "idCliente" })
  cliente: Clientes;

  /**
   * Fecha y hora de la llamada
   * @example "2024-01-20T10:30:00"
   */
  @Column({ type: "timestamp", nullable: false })
  fecha: Date;

  /**
   * Línea en la que se realizó la llamada
   * @example Línea 1
   */
  @Column({ type: "varchar", length: 50, nullable: false })
  linea: string;
}

export default Llamadas;
