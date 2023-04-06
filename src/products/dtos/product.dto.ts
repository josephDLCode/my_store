import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min
} from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number

  @IsUrl()
  @IsNotEmpty()
  readonly image: string
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @Min(0)
  offset: number
}
