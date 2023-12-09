import { useAtom, useAtomValue } from 'jotai'
import {
  cartItemsQuantityAtom,
  productCartAtom,
  promotionCartAtom,
} from '../lib/atoms'
import { Product, Promotion } from '@prisma/client'

export const useCart = () => {
  const [productCart, setProductCart] = useAtom(productCartAtom)
  const [promotionCart, setPromotionCart] = useAtom(promotionCartAtom)
  const cartItemsQuantity = useAtomValue(cartItemsQuantityAtom)

  const addProductToCart = (product: Product) => {
    const currentProductCartItem = productCart.find(
      item => item.product.id === product.id
    )

    if (currentProductCartItem) {
      const updatedProductCart = productCart.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }

        return item
      })

      setProductCart(updatedProductCart)
      return
    }
    setProductCart(prev => [...prev, { product, quantity: 1 }])
  }

  const removeProductFromCart = (product: Product) => {
    const currentProductCartItem = productCart.find(
      item => item.product.id === product.id
    )

    if (currentProductCartItem) {
      const updatedProductCart = productCart.map(item => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity !== 0 ? item.quantity - 1 : 0,
          }
        }

        return item
      })

      setProductCart(updatedProductCart)
      return
    }
  }

  const addPromotionToCart = (promotion: Promotion) => {
    const currentPromotionCartItem = promotionCart.find(
      item => item.promotion.id === promotion.id
    )

    if (currentPromotionCartItem) {
      const updatedPromotionCart = promotionCart.map(item => {
        if (item.promotion.id === promotion.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          }
        }

        return item
      })

      setPromotionCart(updatedPromotionCart)
      return
    }
    setPromotionCart(prev => [...prev, { promotion, quantity: 1 }])
  }

  const removePromotionFromCart = (promotion: Promotion) => {
    const currentPromotionCartItem = promotionCart.find(
      item => item.promotion.id === promotion.id
    )

    if (currentPromotionCartItem) {
      const updatedPromotionCart = promotionCart.map(item => {
        if (item.promotion.id === promotion.id) {
          return {
            ...item,
            quantity: item.quantity !== 0 ? item.quantity - 1 : 0,
          }
        }

        return item
      })

      setPromotionCart(updatedPromotionCart)
      return
    }
  }

  const clearCart = () => {
    setProductCart([])
    setPromotionCart([])
  }

  return {
    addProductToCart,
    removeProductFromCart,
    addPromotionToCart,
    removePromotionFromCart,
    productCart,
		setProductCart,
    promotionCart,
		setPromotionCart,
    cartItemsQuantity,
    clearCart,
  }
}
