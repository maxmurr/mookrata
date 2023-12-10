'use client'

import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { ScrollArea } from '../ui/scroll-area'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import ProductItem from '../product-item'
import { useCart } from '../../hooks/use-cart-hook'
import Image from 'next/image'
import { AspectRatio } from '../ui/aspect-ratio'
import { Promotion } from '@prisma/client'

type PromotionDrawerProps = {
  children: React.ReactNode
  promotion: any
}

const PromotionDrawer = ({ children, promotion }: PromotionDrawerProps) => {
  const { addPromotionToCart, removePromotionFromCart, promotionCart } =
    useCart()

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className='h-full flex flex-col justify-between pt-4'>
          <div className='flex py-0 px-4 flex-col items-start gap-4 h- justify-between'>
            <AspectRatio ratio={16 / 9} className='w-full h-72'>
              <Image
                src='/images/promotion.jpeg'
                alt='promotion'
                fill
                objectFit='cover'
                className='rounded-lg '
              />
            </AspectRatio>
            <div className='flex items-center gap-4 pb-4 justify-between w-full border-b'>
              <p className='text-2xl font-semibold text-gray-900'>
                {promotion.name}
              </p>
              <p className='text-xl font-semibold text-gray-900'>
                {promotion.price} บาท
              </p>
            </div>
            <p className='text-base text-gray-700'>{promotion.description}</p>
            <div className='flex flex-col items-start gap-4 w-full -mt-2'>
              <p className='text-lg font-semibold text-gray-900 '>
                รายการอาหารในชุด
              </p>
              <ScrollArea className='w-full max-h-80 overflow-y-auto'>
                <div className='flex flex-col items-start gap-4 w-full'>
                  {promotion.productCart?.productCartItems.map(
                    (item: {
                      id: number
                      product: Promotion
                      quantity: number
                    }) => (
                      <ProductItem
                        key={item.id}
                        name={item.product.name}
                        imageUrl={item.product.image}
                        quantity={item.quantity}
                      />
                    )
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          <div className='flex p-4 items-center gap-4 border-t w-full mt-4'>
            <div className='flex items-center gap-4 '>
              <Button
                variant={'outline'}
                type='button'
                size={'icon'}
                className='p-[10px]'
                onClick={() => {
                  removePromotionFromCart(promotion)
                }}
              >
                <Icons.minus />
              </Button>
              <p className='text-lg font-semibold text-gray-900'>
                {promotionCart.find(item => item.promotion.id === promotion.id)
                  ?.quantity || 0}
              </p>
              <Button
                variant={'outline'}
                type='button'
                size={'icon'}
                className='p-[10px]'
                onClick={() => {
                  addPromotionToCart(promotion)
                }}
              >
                <Icons.plus />
              </Button>
            </div>
            <Button
              className='w-full'
              disabled={
                promotionCart.find(item => item.promotion.id === promotion.id)
                  ?.quantity === 0 || !promotionCart.length
              }
              onClick={() => {
                const escEvent = new KeyboardEvent('keydown', {
                  key: 'Escape',
                })
                document.dispatchEvent(escEvent)
                return
              }}
            >
              เพิ่ม
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default PromotionDrawer
