'use client'

import React from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'
import { Order } from '@prisma/client'
import { Icons } from '../icons'
import { orderStatus } from '../../lib/constants'
import { updateOrderStatus } from '../../lib/actions/order'
import toast from 'react-hot-toast'

type OrderStatusDrawerProps = {
  children: React.ReactNode
  index: number
  order: Order
}

const OrderStatusDrawer = ({
  children,
  index,
  order,
}: OrderStatusDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='h-fit w-full'>
        <DrawerHeader className='border-none justify-start items-start py-5 px-4 text-lg font-semibold text-gray-900'>
          อัปเดตสถานะ ของรายการที่ {index + 1}
        </DrawerHeader>
        <div className='px-4 pb-4 flex gap-3 flex-col'>
          {orderStatus.map((status, i) => (
            <Button
              key={i}
              variant={'ghost'}
              className={`w-full items-start justify-between flex text-base font-semibold ${
                order.status === status.value ? 'bg-gray-50' : ''
              } text-gray-700`}
              onClick={async () => {
                if (order.status === status.value) return

                await updateOrderStatus(order.id, status.value)
                  .then(() => {
                    toast.success('อัปเดตสถานะเรียบร้อยแล้ว')
                    const escEvent = new KeyboardEvent('keydown', {
                      key: 'Escape',
                    })
                    document.dispatchEvent(escEvent)
                  })
                  .catch(e => {
                    toast.error('อัปเดตสถานะไม่สำเร็จ')
                    console.log('Error', e)
                  })
              }}
            >
              <p>{status.language.th}</p>
              {order.status === status.value && (
                <Icons.check className='w-5 h-5 text-gray-700 font-semibold' />
              )}
            </Button>
          ))}
          <DrawerClose>
            <Button variant={'outline'} className='w-full'>
              ยกเลิก
            </Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default OrderStatusDrawer
