import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('products') // Esto crea la ruta base: http://localhost:3000/products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Producto creado exitosamente' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de productos obtenida exitosamente' })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  // Puedes agregar más métodos como findOne, update, etc.
}