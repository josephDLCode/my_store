import { IsString, IsNotEmpty } from 'class-validator'
import { PartialType } from '@nestjs/swagger'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string
  @IsString()
  readonly description: string
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
