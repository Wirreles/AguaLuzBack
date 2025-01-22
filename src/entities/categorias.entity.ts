import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Productos from "./productos.entity";

@Entity({ name: "categorias" })
class Categorias {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  idCategoria: string;

  /**
   * Nombre de la categoría
   * @example Limpieza
   */
  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  nombre: string;

  /**
   * Descripción de la categoría
   * @example Productos relacionados con la limpieza
   */
  @Column({ type: "text", nullable: true })
  descripcion: string;

  /**
   * Relación con Productos (One-to-Many)
   */
  @OneToMany(() => Productos, (producto) => producto.categoria)
  productos: Productos[];
}

export default Categorias;
