'use server'

import { revalidatePath } from 'next/cache'
import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'

export const createProduct = async (
  name: string,
  price: number,
  description: string | undefined,
  categoryId: number,
  image?: string | undefined
) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const product = await db.product.create({
    data: {
      name,
      price,
      description,
      image,
      categoryId,
      userId: Number(session.user.id),
    },
  })

  revalidatePath(`/dashboard/menu/category/${categoryId}`)
  return product
}

export const updateProduct = async (
  name: string,
  price: number,
  description: string | undefined,
  productId: number,
  categoryId: number,
  image?: string | undefined
) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const product = await db.product.update({
    where: {
      id: productId,
    },
    data: {
      name,
      price,
      description,
      image,
    },
  })

  revalidatePath(`/dashboard/menu/category/${categoryId}`)
  return product
}

export const deleteProduct = async (productId: number, categoryId: number) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const product = await db.product.delete({
    where: {
      id: productId,
    },
  })

  revalidatePath(`/dashboard/menu/${categoryId}`)
  return product
}
