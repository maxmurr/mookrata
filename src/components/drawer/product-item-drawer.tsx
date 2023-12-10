'use client'

import React, { useEffect } from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import { Product } from '@prisma/client'
import { useCart } from '../../hooks/use-cart-hook'
import {
  deletePromotionProductCartProductItem,
  upsertPromotionProductCart,
} from '../../lib/actions/promotion'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { AspectRatio } from '../ui/aspect-ratio'

type ProductItemDrawerProps = {
  children: React.ReactNode
  product: Product
  promotion?: any
  isEdit?: boolean
  isRemove?: boolean
}

const ProductItemDrawer = ({
  children,
  product,
  promotion,
  isEdit,
  isRemove,
}: ProductItemDrawerProps) => {
  const {
    addProductToCart,
    removeProductFromCart,
    productCart,
    setProductCart,
  } = useCart()

  useEffect(() => {
    if (!isEdit) return

    if (!promotion?.productCart) {
      setProductCart([])
      return
    }

    setProductCart(
      promotion.productCart.productCartItems.map(
        (item: { product: Product; quantity: number }) => ({
          product: item.product,
          quantity: item.quantity,
        })
      )
    )

    return () => {
      setProductCart([])
    }
  }, [isEdit, promotion, setProductCart])

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className='w-full'>
        <div className='h-full flex flex-col justify-between pt-4'>
          <div className='flex py-0 px-4 flex-col items-start gap-4 h-96 justify-between'>
            <AspectRatio ratio={16 / 9} className='w-full h-72'>
              <Image
                src='/images/pork.png'
                alt='product image'
                fill
                objectFit='cover'
                className='rounded-lg'
              />
            </AspectRatio>
            <div className='flex items-center gap-4 pb-2 justify-between w-full'>
              <p className='text-2xl font-semibold text-gray-900'>
                {product.name}
              </p>
              <p className='text-xl font-semibold text-gray-900'>
                {product.price} บาท
              </p>
            </div>
            <p className='text-base text-gray-700'>{product.description}</p>
          </div>
          <div className='flex p-4 items-center gap-4 border-t w-full mt-4'>
            <div className='flex items-center gap-4 '>
              <Button
                variant={'outline'}
                type='button'
                size={'icon'}
                className='p-[10px]'
                onClick={() => removeProductFromCart(product)}
              >
                <Icons.minus />
              </Button>
              <p className='text-lg font-semibold text-gray-900'>
                {productCart.find(item => item.product.id === product.id)
                  ?.quantity || 0}
              </p>
              <Button
                variant={'outline'}
                type='button'
                size={'icon'}
                className='p-[10px]'
                onClick={() => addProductToCart(product)}
              >
                <Icons.plus />
              </Button>
            </div>
            <Button
              className='w-full'
              onClick={async () => {
                const isProductItemsEmpty =
                  productCart.find(item => item.product.id === product.id)
                    ?.quantity === 0 || !productCart.length

                if (isRemove) {
                  const escEvent = new KeyboardEvent('keydown', {
                    key: 'Escape',
                  })
                  document.dispatchEvent(escEvent)
                  return
                }

                if (isEdit && isProductItemsEmpty) {
                  await deletePromotionProductCartProductItem(
                    promotion.id,
                    promotion.productCart.productCartItems.find(
                      (item: { product: { id: number } }) =>
                        item.product.id === product.id
                    ).id
                  )
                    .then(() => {
                      toast.success('ลบสินค้าเรียบร้อย')
                      const escEvent = new KeyboardEvent('keydown', {
                        key: 'Escape',
                      })
                      document.dispatchEvent(escEvent)
                    })
                    .catch(e => {
                      toast.error('ลบสินค้าไม่สำเร็จ')
                      console.error(e)
                    })
                } else {
                  await upsertPromotionProductCart(promotion.id, productCart)
                    .then(() => {
                      toast.success('เพิ่มสินค้าเรียบร้อย')
                      const escEvent = new KeyboardEvent('keydown', {
                        key: 'Escape',
                      })
                      document.dispatchEvent(escEvent)
                    })
                    .catch(e => {
                      toast.error('เพิ่มสินค้าไม่สำเร็จ')
                      console.error(e)
                    })
                }
              }}
              disabled={
                (!isEdit &&
                  productCart.find(item => item.product.id === product.id)
                    ?.quantity === 0) ||
                !productCart.length
              }
              variant={
                isEdit
                  ? productCart.find(item => item.product.id === product.id)
                      ?.quantity === 0 || !productCart.length
                    ? 'destructive'
                    : 'default'
                  : 'default'
              }
            >
              {isEdit
                ? productCart.find(item => item.product.id === product.id)
                    ?.quantity === 0 || !productCart.length
                  ? 'ลบ'
                  : 'บันทึก'
                : 'เพิ่ม'}
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default ProductItemDrawer
