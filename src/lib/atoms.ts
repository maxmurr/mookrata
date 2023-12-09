import { Product, Promotion } from '@prisma/client'
import { atom } from 'jotai'

export type ProductCart = {
  product: Product
  quantity: number
}

export type PromotionCart = {
  promotion: Promotion
  quantity: number
}

export const productCartAtom = atom<ProductCart[]>([])
export const promotionCartAtom = atom<PromotionCart[]>([])

export const cartItemsQuantityAtom = atom(get => {
  const productCart = get(productCartAtom)
  const promotionCart = get(promotionCartAtom)
  const productQuantity = productCart.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  )
  const promotionQuantity = promotionCart.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  )
  return productQuantity + promotionQuantity
})
