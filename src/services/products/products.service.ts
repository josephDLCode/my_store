import { Injectable, NotFoundException } from '@nestjs/common'
import { Product } from '../../entities/product.entity'
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dtos'

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 12,
      image: '',
      stock: 12
    }
  ]

  findAll() {
    return this.products
  }

  findOne(id: number) {
    const product = this.products.find((product) => product.id === id)
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    return product
  }

  create(payload: CreateProductDto) {
    const newProduct = { ...payload, id: this.products.length + 1 }
    this.products.push(newProduct)
    return newProduct
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id)
    if (product) {
      const index = this.products.findIndex((product) => product.id === id)
      this.products.splice(index, 1, { ...product, ...payload })
      return product
    }

    return null
  }

  remove(id: number) {
    const product = this.findOne(id)
    const index = this.products.findIndex((product) => product.id === id)
    const deletedProduct = this.products[index]
    this.products.splice(index, 1)
    return deletedProduct
  }
}
