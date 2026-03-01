import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, MinLength, IsPositive, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Lenovo Legion 5' })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name!: string;

  @ApiProperty({ example: 'Laptop gamer potente', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 1200.50 })
  @IsNumber()
  @IsPositive({ message: 'El precio debe ser un número mayor a 0' })
  price!: number;
}