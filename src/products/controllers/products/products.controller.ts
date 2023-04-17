import { ApiOperation, ApiTags } from '@nestjs/swagger'
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
  HttpException,
  UseGuards
  /* ParseIntPipe */
} from '@nestjs/common'

import { ProductsService } from '../../services/products/products.service'
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe'
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto
} from '../../dtos/product.dto'
import { MongoIdPipe } from 'src/common/mongo-id/mongo-id.pipe'
import { AuthGuard } from '@nestjs/passport'

@UseGuards(AuthGuard('jwt'))
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params)
  }

  @Get(':productId')
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId)
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload)
  }

  @Put(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto
  ) {
    return this.productsService.update(productId, payload)
  }

  @Delete(':productId')
  delete(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.remove(productId)
  }
}
