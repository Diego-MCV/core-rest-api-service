import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: 'ID unico incremental', example:1})
  id!: number;

  @Column({ type: 'text', unique: true })
  @ApiProperty({ description: 'Nombre unico de la categoria', example: 'Componentes de Computadora'})
  name!: string;

  // RELACIÓN: Una categoría tiene MUCHOS productos
  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({ description: 'Productos que pertenecen a la categoria', example: 'Procesador..' })
  products!: Product[];
}