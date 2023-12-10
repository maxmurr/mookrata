import { products } from './seed-data/products'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { users } from './seed-data/users'
import { tables } from './seed-data/tables'
import { categories } from './seed-data/categories'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  for (const user of users) {
    await prisma.user.upsert({
      where: {
        name: user.name,
      },
      update: {},
      create: {
        name: user.name,
        password: await bcrypt.hash(user.password, 10),
      },
    })
  }

  for (const table of tables) {
    await prisma.table.upsert({
      where: {
        name: table.name,
        userId: table.userId,
      },
      update: {},
      create: {
        name: table.name,
        userId: table.userId,
      },
    })
  }

  for (const category of categories) {
    await prisma.category.upsert({
      where: {
        name: category.name,
      },
      update: {},
      create: {
        name: category.name,
        userId: category.userId,
      },
    })
  }

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name: product.name,
      },
      update: {},
      create: {
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
        userId: product.userId,
      },
    })
  }

  console.log('Seeding done!')
}

void main()
