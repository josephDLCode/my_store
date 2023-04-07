import { PartialType } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateSubDocDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string
}

export class UpdateSubDocDto extends PartialType(CreateSubDocDto) {}
