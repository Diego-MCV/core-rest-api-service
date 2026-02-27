import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'serviceCore',
            entities: [Product],
            synchronize: true, 
        }),
        ProductsModule,
    ],
})
export class AppModule{}