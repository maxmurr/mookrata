'use server'

import { revalidatePath } from 'next/cache'
import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'

export const getPromotions = async () => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const promotions = await db.promotion.findMany()

  revalidatePath('/dashboard/promotion')
  return promotions
}

export const getPromotionById = async (id: number) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const promotion = await db.promotion.findUnique({
    where: {
      id,
    },
  })

  revalidatePath(`/dashboard/promotion/${id}`)
  return promotion
}

export const createPromotion = async (
  name: string,
  price: number,
  description: string | undefined,
  image: string | undefined
) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const promotion = await db.promotion.create({
    data: {
      name,
      price,
      description,
      image: image ?? null,
      userId: Number(session.user.id),
    },
  })

  revalidatePath(`/dashboard/promotion`)
  return promotion
}
