import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/categories.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'serviceCore',
            entities: [Product, Category],
            synchronize: true, 
        }),
        ProductsModule,
        CategoriesModule,
    ],
})
export class AppModule{}