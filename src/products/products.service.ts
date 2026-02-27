import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepository.find(); // SELECT * FROM product
  }

  create(createProductDto: any) {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct); // INSERT INTO...
  }
}