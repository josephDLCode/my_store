import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  HttpException
  /* ParseIntPipe */
} from '@nestjs/common'

import { ProductsService } from '../../services/products/products.service'
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe'
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos'

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 200,
    @Query('offset') offset = 0,
    @Query('brand') brand: string
  ) {
    /* return `products limit => ${limit} offset => ${offset} brand => ${brand}` */
    return this.productsService.findAll()
  }

  @Get(':productId')
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId)
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload)
  }

  @Put(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(productId, payload)
  }

  @Delete(':productId')
  delete(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.remove(productId)
  }
}
