import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    const products = await this.productRepository.find(); // SELECT * FROM product
    if (products.length === 0) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  async create(createProductDto: CreateProductDto) {
    const newProduct = this.productRepository.create(createProductDto);
    return this.productRepository.save(newProduct); // INSERT INTO...
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.update(id, updateProductDto);
    return { message: 'Product updated successfully' };
  }
  
  async remove(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
    return { message: 'Product removed successfully' };
  }
}