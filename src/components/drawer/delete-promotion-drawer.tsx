'use client'

import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { Promotion } from '@prisma/client'
import { Icons } from '../icons'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'
import { deletePromotion } from '../../lib/actions/promotion'
import { useRouter } from 'next/navigation'

type DeletePromotionDrawerProps = {
  children: React.ReactNode
  promotion: Promotion
}

const DeletePromotionDrawer = ({
  children,
  promotion,
}: DeletePromotionDrawerProps) => {
  const router = useRouter()
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className='h-fit w-full'>
        <div className='flex flex-col items-start justify-center w-full'>
          <div className='flex py-5 px-4 flex-col items-start justify-start gap-3'>
            <div className='w-12 h-12 p-3 flex justify-center items-center rounded-full bg-red-100'>
              <Icons.trash className='w-6 h-6 text-red-500' />
            </div>
            <p className='text-lg font-semibold text-gray-900'>
              ลบ {promotion.name}
            </p>
          </div>
          <div className='flexe py-4 flex-col items-start w-full'>
            <div className='flex py-0 px-4 flex-col items-start gap-3'>
              <Button
                variant={'destructive'}
                className='w-full'
                onClick={async () => {
                  await deletePromotion(promotion.id)
                    .then(() => {
                      toast.success('ลบโปรโมชันเรียบร้อยแล้ว')
                      const escEvent = new KeyboardEvent('keydown', {
                        key: 'Escape',
                      })
                      document.dispatchEvent(escEvent)
                      router.push('/dashboard/promotion')
                      router.refresh()
                    })
                    .catch(e => {
                      toast.error('ลบโปรโมชันไม่สำเร็จ')
                      console.log('Error', e)
                    })
                }}
              >
                ลบ
              </Button>
              <Button
                variant={'outline'}
                className='w-full'
                onClick={() => {
                  const escEvent = new KeyboardEvent('keydown', {
                    key: 'Escape',
                  })
                  document.dispatchEvent(escEvent)
                }}
              >
                ยกเลิก
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default DeletePromotionDrawer
