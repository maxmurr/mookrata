'use client'

import { useAtomValue } from 'jotai'
import React from 'react'
import {
  cartItemsQuantityAtom,
  productCartAtom,
  promotionCartAtom,
} from '../lib/atoms'
import ProductItem from './product-item'
import PromotionDrawer from './drawer/promotion-drawer'
import ProductItemDrawer from './drawer/product-item-drawer'
import { ScrollArea } from './ui/scroll-area'
import { Button } from './ui/button'
import { createOrder } from '../lib/actions/order'
import toast from 'react-hot-toast'
import { useCart } from '../hooks/use-cart-hook'
import { useRouter } from 'next/navigation'

type CartListProps = {
  tableId: number
  qrCode: string
}

const CartList = ({ tableId, qrCode }: CartListProps) => {
  const router = useRouter()
  const { clearCart } = useCart()
  const productCart = useAtomValue(productCartAtom)
  const promotionCart = useAtomValue(promotionCartAtom)
  const cartItemsQuantity = useAtomValue(cartItemsQuantityAtom)

  return (
    <>
      {cartItemsQuantity > 0 ? (
        <>
          <ScrollArea className='w-full max-h-[700px] overflow-y-auto'>
            {promotionCart.map(item => (
              <PromotionDrawer
                key={item.promotion.id}
                promotion={item.promotion}
              >
                <ProductItem
                  name={item.promotion.name}
                  quantity={item.quantity}
                  imageUrl={item.promotion.image}
                  isEdit
                />
              </PromotionDrawer>
            ))}
            {productCart.map(item => (
              <ProductItemDrawer key={item.product.id} product={item.product}>
                <ProductItem
                  name={item.product.name}
                  quantity={item.quantity}
                  imageUrl={item.product.image}
                  isEdit
                />
              </ProductItemDrawer>
            ))}
          </ScrollArea>
          <div className='flex w-full p-4 items-center gap-4 border-t mt-4 fixed bottom-0 right-0'>
            <Button
              className='w-full'
              onClick={async () => {
                await createOrder(tableId, promotionCart, productCart)
                  .then(() => {
                    toast.success('สั่งอาหารเรียบร้อยแล้ว')
                    router.push(`/${qrCode}/${tableId}/table`)
                    router.refresh()
                    clearCart()
                  })
                  .catch(e => {
                    toast.error('สั่งอาหารไม่สำเร็จ')
                    console.error('Error', e)
                  })
              }}
            >
              สั่งอาหารเลย!
            </Button>
          </div>
        </>
      ) : (
        <div className='m-auto w-full flex justify-center items-center h-screen'>
          <p className='text-base font-medium text-gray-500'>
            ยังไม่มีรายการที่รอสั่ง
          </p>
        </div>
      )}
    </>
  )
}

export default CartList
