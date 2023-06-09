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

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { Public } from 'src/auth/decorators/public.decorator'
import { Roles } from 'src/auth/decorators/roles.decorator'
import { Role } from 'src/auth/models/roles.model'
import { RolesGuard } from 'src/auth/guards/roles.guard'

@UseGuards(JwtAuthGuard, RolesGuard) // poner en order de validación
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params)
  }

  @Public()
  @Get(':productId')
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productsService.findOne(productId)
  }

  @Roles(Role.ADMIN)
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
