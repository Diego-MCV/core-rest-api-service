import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importa esto
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/categories.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Registra la entidad aquí
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [TypeOrmModule] // Lo exportamos para que otros módulos lo vean
})
export class CategoriesModule {}