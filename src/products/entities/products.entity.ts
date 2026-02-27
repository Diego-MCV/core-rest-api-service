import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Esto indica que es una tabla de base de datos
export class Product {
  @PrimaryGeneratedColumn() // ID autoincremental
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ default: true })
  isActive: boolean;
}