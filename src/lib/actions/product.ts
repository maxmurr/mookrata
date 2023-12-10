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
  const product = await db.product.create({
    data: {
      name,
      price,
      description,
      image,
      categoryId,
      userId: 1,
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
  const product = await db.product.delete({
    where: {
      id: productId,
    },
  })

  revalidatePath(`/dashboard/menu/${categoryId}`)
  return product
}
