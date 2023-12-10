'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../../server/db'
import { getServerAuthSession } from '../../server/auth'

export const getTables = async () => {
  const tables = await db.table.findMany({
    include: {
      orders: true,
    },
  })

  revalidatePath('/dashboard/table')
  return tables
}

export const getTableById = async (id: number) => {
  const table = await db.table.findUnique({
    where: {
      id,
    },
    include: {
      orders: {
        include: {
          productCart: {
            include: {
              productCartItems: {
                include: {
                  product: true,
                },
              },
            },
          },
          promotionCart: {
            include: {
              promotionCartItems: {
                include: {
                  promotion: true,
                },
              },
            },
          },
        },
      },
    },
  })

  revalidatePath(`/dashboard/table/${id}`)
  return table
}

export const createTable = async (name: string) => {
  const table = await db.table.create({
    data: {
      name,
      userId: 1,
    },
  })

  revalidatePath('/dashboard/table')
  return table
}

export const updateTable = async (id: number, name: string) => {
  const table = await db.table.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })

  revalidatePath('/dashboard/table')
  return table
}

export const deleteTable = async (id: number) => {
  const table = await db.table.delete({
    where: {
      id,
    },
  })

  revalidatePath('/dashboard/table')
  return table
}

export const addQrCode = async (id: number, qrCode: string) => {
  const table = await db.table.update({
    where: {
      id,
    },
    data: {
      qrCode,
    },
  })

  revalidatePath(`/dashboard/table/${id}`)
  return table
}
