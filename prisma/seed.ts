import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { users } from './seed-data/users'
import { tables } from './seed-data/tables'

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
      },
      update: {},
      create: {
        name: table.name,
      },
    })
  }

  console.log('Seeding done!')
}

void main()
