'use client'

import React from 'react'
import { Button } from './ui/button'
import { useAtomValue } from 'jotai'
import { cartItemsQuantityAtom } from '../lib/atoms'
import Link from 'next/link'

type CartNotificationProps = {
  href: string
}

const CartNotification = ({ href }: CartNotificationProps) => {
  const cartItemsQuantity = useAtomValue(cartItemsQuantityAtom)

  return (
    cartItemsQuantity > 0 && (
      <div className='flex w-full p-4 items-center gap-4 border-t mt-4 fixed bottom-0'>
        <Link href={href} className='w-full'>
          <Button className='w-full'>
            ตะกร้าของคุณ (รอสั่ง {cartItemsQuantity} รายการ)
          </Button>
        </Link>
      </div>
    )
  )
}

export default CartNotification
