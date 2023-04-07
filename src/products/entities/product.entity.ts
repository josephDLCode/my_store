import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ type: Number, index: true }) // index: true, crea un indice para el campo
  price: number

  @Prop({ type: Number })
  stock: number

  @Prop()
  image: string
}

export const ProductSchema = SchemaFactory.createForClass(Product)
ProductSchema.index({ price: 1, stock: -1 }) // 1 ascendente, -1 descendente, indeción compuesta
