import { Document, Types } from 'mongoose'
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'

import { Brand } from './brand.entity'
import { SubDoc, SubDocSchema } from './sub-doc.entity'

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

  @Prop(
    raw({
      name: { type: String },
      description: { type: String },
      image: { type: String }
    })
  )
  category: Record<string, any>

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId // 1:1

  @Prop({ type: SubDocSchema })
  subDoc: SubDoc // 👈 new field (1:1)

  @Prop({ type: [SubDocSchema] })
  subDocs: Types.Array<SubDoc> // 👈 new field (1:N)
}

export const ProductSchema = SchemaFactory.createForClass(Product)
ProductSchema.index({ price: 1, stock: -1 }) // 1 ascendente, -1 descendente, indeción compuesta
