import Products from 'src/entities/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'categories',
})
class Categories {
  /**
   * Identificador único de la categoría en formato UUID.
   * @example "3e4e3766-8b30-4bb7-b8a7-9e2dcf27e9db"
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Nombre de la categoría.
   * @example "Limpieza del hogar"
   */
  @Column({
    length: 50,
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  name: string;

  /**
   * Productos pertenecientes a esta categoría.
   */
  @OneToMany(() => Products, (products) => products.category)
  @JoinColumn()
  products: Products[];
}

export default Categories;
