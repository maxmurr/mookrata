'use server'

import { ProductCart, PromotionCart } from '../atoms'
import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'
import { revalidatePath } from 'next/cache'
import { OrderStatus } from '@prisma/client'

export const createOrder = async (
  tableId: number,
  promotionCart?: PromotionCart[],
  productCart?: ProductCart[]
) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const createdOrder = await db.order.create({
    data: {
      table: {
        connect: {
          id: tableId,
        },
      },
    },
  })

  if (!createdOrder) throw new Error('Order not created')

  if (promotionCart) {
    const createdPromotionCartItems = promotionCart.map(promotionCartItem => {
      if (promotionCartItem.quantity > 0) {
        return db.promotionCart.create({
          data: {
            promotionCartItems: {
              create: {
                quantity: promotionCartItem.quantity,
                promotion: {
                  connect: {
                    id: promotionCartItem.promotion.id,
                  },
                },
              },
            },
            order: {
              connect: {
                id: createdOrder.id,
              },
            },
          },
        })
      }
    })

    await Promise.all(createdPromotionCartItems)
  }

  if (productCart) {
    const createdProductCartItems = productCart.map(productCartItem => {
      if (productCartItem.quantity > 0) {
        return db.productCart.create({
          data: {
            productCartItems: {
              create: {
                quantity: productCartItem.quantity,
                product: {
                  connect: {
                    id: productCartItem.product.id,
                  },
                },
              },
            },
            order: {
              connect: {
                id: createdOrder.id,
              },
            },
          },
        })
      }
    })

    await Promise.all(createdProductCartItems)
  }

  revalidatePath('/dashboard/table')
  return createdOrder
}

export const updateOrderStatus = async (
  id: number,
  status: OrderStatus,
) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const order = await db.order.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })

  revalidatePath(`/dashboard/order`)
  return order
}
