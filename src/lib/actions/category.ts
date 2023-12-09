'use server'

import { revalidatePath } from 'next/cache'
import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'

export const getCategories = async () => {
  return db.category.findMany({
    include: {
      products: {
        include: {
          productCartItems: {
            include: {
              productCart: true,
            },
          },
        },
      },
    },
  })
}

export const createCategory = async (name: string, image?: string) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const category = await db.category.create({
    data: {
      name,
      image: image ?? null,
      userId: Number(session.user.id),
    },
  })

  revalidatePath('/dashboard/menu')
  return category
}

export const getCategoryById = async (id: number) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      products: {
        include: {
          productCartItems: {
            include: {
              productCart: true,
            },
          },
        },
      },
    },
  })

  revalidatePath(`/dashboard/menu/${id}`)
  return category
}

export const updateCategory = async (
  id: number,
  name: string,
  image?: string
) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const category = await db.category.update({
    where: {
      id,
    },
    data: {
      name,
      image: image ?? null,
    },
  })

  revalidatePath('/dashboard/menu')
  return category
}

export const deleteCategory = async (id: number) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const category = await db.category.delete({
    where: {
      id,
    },
  })

  revalidatePath('/dashboard/menu')
  return category
}
