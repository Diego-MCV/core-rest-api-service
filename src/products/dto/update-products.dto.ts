import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-products.dto';

// PartialType hace que todos los campos del CreateProductDto sean opcionales para el Update
export class UpdateProductDto extends PartialType(CreateProductDto) {}