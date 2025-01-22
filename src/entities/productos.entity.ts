import { ApiHideProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Categorias from "./categorias.entity";
import ProductosPedidos from "./productos_pedidos.entity";

@Entity({ name: "productos" })
class Productos {
  @ApiHideProperty()
  @PrimaryGeneratedColumn("uuid")
  codProducto: string;

  /**
   * Nombre del producto
   * @example Trapeador
   */
  @Column({ type: "varchar", length: 50, nullable: false })
  nombre: string;

  /**
   * Descripción del producto
   * @example Se utiliza para limpiar el piso
   */
  @Column({ type: "text", nullable: false })
  descripcion: string;

  /**
   * Precio del producto
   * @example 15.00
   */
  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  precio: number;

  /**
   * Indica si el producto está activo
   * @example true
   */
  @Column({ type: "boolean", default: true })
  activo: boolean;

  /**
   * Stock disponible del producto
   * @example 24
   */
  @Column({ type: "int", nullable: false })
  stock: number;

  /**
   * Stock mínimo permitido
   * @example 5
   */
  @Column({ type: "int", nullable: false })
  minimo: number;

  /**
   * Campo de control para el producto
   * @example ABC123
   */
  @Column({ type: "varchar", length: 20, nullable: false })
  control: string;

  /**
   * Relación con Categorias (Many-to-One)
   */
  @ManyToOne(() => Categorias, (categoria) => categoria.productos)
  @JoinColumn({ name: "idCategoria" })
  categoria: Categorias;

  /**
   * Relación con ProductosPedidos (One-to-Many)
   */
  @OneToMany(() => ProductosPedidos, (productosPedidos) => productosPedidos.producto)
  productosPedidos: ProductosPedidos[];
}

export default Productos;
