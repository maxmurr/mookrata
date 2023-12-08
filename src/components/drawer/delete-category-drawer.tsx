'use client'

import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { Icons } from '../icons'
import { Category, Table } from '@prisma/client'
import { Button } from '../ui/button'
import { deleteTable } from '../../lib/actions/table'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { deleteCategory } from '../../lib/actions/category'

type DeleteCategoryDrawerProps = {
  children: React.ReactNode
  category: Category
}

const DeleteCategoryDrawer = ({
  children,
  category,
}: DeleteCategoryDrawerProps) => {
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
              ลบ {category.name}
            </p>
          </div>
          <div className='flexe py-4 flex-col items-start w-full'>
            <div className='flex py-0 px-4 flex-col items-start gap-3'>
              <Button
                variant={'destructive'}
                className='w-full'
                onClick={async () => {
                  await deleteCategory(Number(category.id))
                    .then(() => {
                      toast.success('ลบหมวดหมู่เรียบร้อยแล้ว')
                      const escEvent = new KeyboardEvent('keydown', {
                        key: 'Escape',
                      })
                      document.dispatchEvent(escEvent)
                      router.back()
                    })
                    .catch(() => {
                      toast.error('ลบหมวดหมู่ไม่สำเร็จ')
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

export default DeleteCategoryDrawer
