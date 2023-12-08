import { revalidatePath } from 'next/cache'
import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'

export const createPromotion = async (
  name: string,
  price: number,
  description: string | undefined,
  image: string | undefined
) => {
  const session = await getServerAuthSession()
  if (!session) throw new Error('Unauthorized')
  const product = await db.promotion.create({
    data: {
      name,
      price,
      description,
      image,
      userId: Number(session.user.id),
    },
  })
  revalidatePath(`/dashboard/promotion`)
  return product
}
