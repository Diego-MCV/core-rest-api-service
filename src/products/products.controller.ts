import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-products.dto';
import { Product } from './entities/products.entity';

@Controller('products') // Esto crea la ruta base: http://localhost:3000/products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado con éxito', type: Product })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida con éxito', type: [Product] })
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto eliminado con éxito', type: Product })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por su ID' })
  @ApiResponse({ status: 200, description: 'Producto actualizado con éxito', type: Product })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  update(
  @Param('id', ParseIntPipe) id: number, 
  @Body() updateProductDto: UpdateProductDto
  ) {
  return this.productsService.update(id, updateProductDto);
  }
}