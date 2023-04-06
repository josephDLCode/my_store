import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { BrandsService } from './services/brands/brands.service'
import { ProductsService } from './services/products/products.service'
import { BrandsController } from './controllers/brands/brands.controller'
import { CategoriesService } from './services/categories/categories.service'
import { ProductsController } from './controllers/products/products.controller'
import { CategoriesController } from './controllers/categories/categories.controller'
import { Product, ProductSchema } from './entities/product.entity'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService]
})
export class ProductsModule {}
