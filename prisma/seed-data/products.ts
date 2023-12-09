import { Product } from '@prisma/client'

export const products: {
  name: Product['name']
  price: Product['price']
  categoryId: Product['categoryId']
  userId: Product['userId']
}[] = [
  {
    name: 'อาหารทานเล่น 1',
    price: 99.99,
    categoryId: 1,
    userId: 1,
  },
  {
    name: 'อาหารทานเล่น 2',
    price: 149.49,
    categoryId: 1,
    userId: 1,
  },
  {
    name: 'อาหารหลัก 1',
    price: 199.99,
    categoryId: 2,
    userId: 1,
  },
  {
    name: 'อาหารหลัก 2',
    price: 249.99,
    categoryId: 2,
    userId: 1,
  },
  {
    name: 'ของหวาน 1',
    price: 79.99,
    categoryId: 3,
    userId: 1,
  },
  {
    name: 'ของหวาน 2',
    price: 89.49,
    categoryId: 3,
    userId: 1,
  },
  {
    name: 'เครื่องดื่ม 1',
    price: 39.99,
    categoryId: 4,
    userId: 1,
  },
  {
    name: 'เครื่องดื่ม 2',
    price: 59.49,
    categoryId: 4,
    userId: 1,
  },
]
