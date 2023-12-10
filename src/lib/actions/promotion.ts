'use server'

import { revalidatePath } from 'next/cache'
import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'
import { ProductCart } from '../atoms'

export const getPromotions = async () => {
  const promotions = await db.promotion.findMany({
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
    },
  })

  revalidatePath('/dashboard/promotion')
  return promotions
}

export const getPromotionById = async (id: number) => {
  const promotion = await db.promotion.findUnique({
    where: {
      id,
    },
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
    },
  })

  revalidatePath(`/dashboard/promotion/${id}`)
  return promotion
}

export const createPromotion = async (
  name: string,
  price: number,
  description: string | undefined,
  image?: string | undefined
) => {
  const promotion = await db.promotion.create({
    data: {
      name,
      price,
      description,
      image: image ?? null,
      userId: 1,
    },
  })

  revalidatePath(`/dashboard/promotion`)
  return promotion
}

export const updatePromotion = async (
  id: number,
  name: string,
  price: number,
  description: string | undefined,
  image?: string | undefined
) => {
  const promotion = await db.promotion.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      description,
      image: image ?? null,
    },
  })

  revalidatePath(`/dashboard/promotion`)
  return promotion
}

export const upsertPromotionProductCart = async (
  id: number,
  productCarts: ProductCart[]
) => {
  const promotion = await db.promotion.findUnique({
    where: {
      id,
    },
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
    },
  })

  if (!promotion) throw new Error('Promotion not found')

  const existingProductCart = promotion.productCart

  if (existingProductCart) {
    const updatedProductCartItems = productCarts.map(productCart => {
      if (productCart.quantity === 0) return
      const existingProductItem = existingProductCart.productCartItems.find(
        productCartItem => productCartItem.productId === productCart.product.id
      )

      if (existingProductItem) {
        return db.productCartItem.update({
          where: {
            id: existingProductItem.id,
          },
          data: {
            quantity: productCart.quantity,
          },
        })
      } else {
        return db.productCartItem.create({
          data: {
            quantity: productCart.quantity,
            product: {
              connect: {
                id: productCart.product.id,
              },
            },
            productCart: {
              connect: {
                id: existingProductCart.id,
              },
            },
          },
        })
      }
    })

    revalidatePath(`/dashboard/promotion/${id}`)
    return await Promise.all(updatedProductCartItems)
  } else {
    const createdProductCart = await db.productCart.create({
      data: {
        promotion: {
          connect: {
            id,
          },
        },
      },
    })

    const createdProductCartItems = await Promise.all(
      productCarts.map(productCart =>
        db.productCartItem.create({
          data: {
            productCart: {
              connect: {
                id: createdProductCart.id,
              },
            },
            product: {
              connect: {
                id: productCart.product.id,
              },
            },
            quantity: productCart.quantity,
          },
        })
      )
    )

    revalidatePath(`/dashboard/promotion/${id}`)
    return createdProductCartItems
  }
}
export const deletePromotionProductCartProductItem = async (
  id: number,
  productCartItemId: number
) => {
  const promotion = await db.promotion.findUnique({
    where: {
      id,
    },
    include: {
      productCart: true,
    },
  })

  if (!promotion) throw new Error('Promotion not found')

  if (!promotion.productCart) throw new Error('Product cart not found')

  const productCartItem = await db.productCartItem.findUnique({
    where: {
      id: productCartItemId,
    },
  })

  if (!productCartItem) throw new Error('Product cart item not found')

  const deletedProductCartItem = await db.productCartItem.delete({
    where: {
      id: productCartItemId,
    },
  })

  revalidatePath(`/dashboard/promotion/${id}`)
  return deletedProductCartItem
}
