import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { CreateProductDto } from './dto/create-products.dto';
import { UpdateProductDto } from './dto/update-products.dto';

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
    const { categoryId, ...productData } = createProductDto;

    const product = this.productRepository.create({
      ...productData, category:{ id: categoryId} }); // TyoeORM entiende que esto vincula al ID
    return this.productRepository.save(product); 
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }


  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, ...dataToUpdate } = updateProductDto;
  
    // Preload busca el objeto por ID y le "encima" los nuevos datos
    const product = await this.productRepository.preload({
      id: id,
      ...dataToUpdate,
      category: categoryId ? { id: categoryId } : undefined, // Si mandan categoría, la actualiza
    });
  
    if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
  
    return await this.productRepository.save(product);
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