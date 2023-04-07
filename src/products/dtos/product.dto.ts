import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested
} from 'class-validator'
import { PartialType } from '@nestjs/swagger'
import { CreateCategoryDto } from './category.dto'

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

  @IsNotEmpty()
  @ValidateNested() // valida los campos de un objeto en cascada
  readonly category: CreateCategoryDto
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @Min(0)
  offset: number

  @IsOptional()
  @Min(0)
  minPrice: number

  @ValidateIf((params) => params.minPrice) // si es true se ejecuta la validacion de forma obligatoria
  @IsPositive()
  maxPrice: number
}
