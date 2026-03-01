import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/categories.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity() // Esto indica que es una tabla de base de datos
export class Product {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: 'ID del producto', example: 1 })
  id!: number;

  @Column()
  @ApiProperty({ description: 'Nombre del producto', example: 'Lenovo Legion 5' })
  name: string;

  @Column('decimal')
  @ApiProperty({ description: 'Precio del producto', example: 1200.50 })
  price: number;

  @Column({ default: true })
  @ApiProperty({ description: 'Estado del producto', example: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.products, 
  { eager: true }) // eager: true significa que se cargan las categorías al mismo tiempo que los productos
  @JoinColumn({ name: 'category_id' })
  @ApiProperty({ description: 'Categoría del producto', example: 1 })
  category!: Category;
}