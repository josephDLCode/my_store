import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string

  @IsDate()
  @IsNotEmpty()
  readonly date: Date

  @IsArray()
  @IsNotEmpty()
  readonly products: string[]
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class AddProductsToOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[]
}
