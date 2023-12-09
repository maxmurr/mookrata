'use client'

import { useAtomValue } from 'jotai'
import React from 'react'
import { productCartAtom, promotionCartAtom } from '../lib/atoms'
import ProductItem from './product-item'
import PromotionDrawer from './drawer/promotion-drawer'
import ProductItemDrawer from './drawer/product-item-drawer'

const CartList = () => {
  const productCart = useAtomValue(productCartAtom)
  const promotionCart = useAtomValue(promotionCartAtom)

  return (
    <>
      {promotionCart.map(item => (
        <PromotionDrawer key={item.promotion.id} promotion={item.promotion}>
          <ProductItem
            name={item.promotion.name}
            quantity={item.quantity}
            isEdit
          />
        </PromotionDrawer>
      ))}
      {productCart.map(item => (
        <ProductItemDrawer key={item.product.id} product={item.product}>
          <ProductItem
            name={item.product.name}
            quantity={item.quantity}
            isEdit
          />
        </ProductItemDrawer>
      ))}
    </>
  )
}

export default CartList
