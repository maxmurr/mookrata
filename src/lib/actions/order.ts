import { OrderStatus } from '@prisma/client'
import { ProductCart, PromotionCart } from '../atoms'
import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'
import { revalidatePath } from 'next/cache'

export const createOrder = async (
  name: string,
  status: OrderStatus,
  tableId: number,
  promotionCart?: PromotionCart,
  productCart?: ProductCart
) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  // TODO

  revalidatePath('/dashboard/order')
  // return order
}
