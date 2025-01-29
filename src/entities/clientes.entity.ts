import { ApiHideProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Zonas from './zonas.entity';
import Pedidos from './pedidos.entity';
import Llamadas from './llamadas.entity';

@Entity({ name: 'clientes' })
class Clientes {
  @ApiHideProperty()
  @PrimaryGeneratedColumn('uuid')
  idCliente: string;

  /**
   * Nombre del cliente
   * @example Juan Perez
   */
  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  /**
   * Zona a la que pertenece el cliente
   */
  @ManyToOne(() => Zonas, (zona) => zona.clientes)
  @JoinColumn({ name: 'idZona' })
  zona: Zonas;

  /**
   * Teléfono del cliente
   * @example +5491166667777
   */
  @Column({ type: 'varchar', length: 15, nullable: false })
  telefono: string;

  /**
   * Observaciones sobre el cliente
   */
  @Column({ type: 'text', nullable: true })
  observaciones: string;

  /**
   * Alerta asignada al cliente
   * @example true
   */
  @Column({ type: 'boolean', default: false })
  alerta: boolean;

  /**
   * Cantidad de llamadas realizadas al cliente
   * @example 3
   */
  @Column({ type: 'int', default: 0 })
  cantLlamadas: number;

  /**
   * Fecha de ingreso del cliente
   * @example "2023-12-01"
   */
  @Column({ type: 'date', nullable: true })
  fIngreso: Date;

  /**
   * Dirección del cliente
   * @example "Calle Falsa 123"
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  domicilio: string;

  /**
   * Pedidos realizados por el cliente
   */
  @OneToMany(() => Pedidos, (pedido) => pedido.cliente)
  pedidos: Pedidos[];

  /**
   * Llamadas realizadas al cliente
   */
  @OneToMany(() => Llamadas, (llamada) => llamada.cliente)
  llamadas: Llamadas[];
}

export default Clientes;
