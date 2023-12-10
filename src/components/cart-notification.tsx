'use client'

import React from 'react'
import { Button } from './ui/button'
import { useAtomValue } from 'jotai'
import { cartItemsQuantityAtom } from '../lib/atoms'
import Link from 'next/link'

type CartNotificationProps = {
  href: string
  table: any
}

const CartNotification = ({ href, table }: CartNotificationProps) => {
  const cartItemsQuantity = useAtomValue(cartItemsQuantityAtom)

  return <>
    {!table.orders?.length && cartItemsQuantity > 0 && (
      <div className='flex w-full p-4 items-center gap-4 border-t mt-4 fixed bottom-0 bg-background'>
        <Link href={href} className='w-full'>

          <Button className='w-full'>
            ตะกร้าของคุณ (รอสั่ง {cartItemsQuantity} รายการ)
          </Button>

        </Link>
      </div>
    )}
    {!!table.orders?.length && (
      <div className='flex w-full p-4 items-center gap-4 border-t mt-4 fixed bottom-0 bg-background'>
        <Link href={href} className='w-full'>

          <Button className='w-full'>
            {cartItemsQuantity > 0
              ? `ตะกร้าของคุณ (รอสั่ง ${cartItemsQuantity} รายการ)`
              : 'ตรวจสอบรายการอาหาร'}
          </Button>

        </Link>
      </div>
    )}
  </>;
}

export default CartNotification
