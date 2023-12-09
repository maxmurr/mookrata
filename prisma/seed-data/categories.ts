import { Category } from '@prisma/client'

export const categories: {
  name: Category['name']
  userId: Category['userId']
}[] = [
  {
    name: 'Appetizer',
    userId: 1,
  },
  {
    name: 'Main',
    userId: 1,
  },
  {
    name: 'Dessert',
    userId: 1,
  },
  {
    name: 'Beverage',
    userId: 1,
  },
]
