/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { ScrollArea } from '../ui/scroll-area'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Icons } from '../icons'
import MenuItem from '../menu-item'

type ProductDrawerProps = {
  children: React.ReactNode
}

const ProductDrawer = ({ children }: ProductDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className='h-full flex flex-col justify-between'>
          <div className='flex py-0 px-4 flex-col items-start gap-4'>
            <img
              src='/images/promotion.jpeg'
              alt='promotion'
              className='h-[360px] w-full rounded-lg object-cover'
            />
            <div className='flex items-center gap-4 pb-4 border-b justify-between w-full'>
              <p className='text-2xl font-semibold text-gray-900'>
                Glamorous Set A
              </p>
              <p className='text-xl font-semibold text-gray-900'>300 บาท</p>
            </div>
            <div className='flex flex-col items-start gap-4 w-full'>
              <p className='text-lg font-semibold text-gray-900 '>
                รายการอาหารในชุด
              </p>
              <ScrollArea className='w-full max-h-80 overflow-y-auto'>
                <div className='flex flex-col items-start gap-4 w-full'>
                  <MenuItem name='หมูสไลด์' />
                  <MenuItem name='หมูสไลด์' />
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
              >
                <Icons.minus />
              </Button>
              <p className='text-lg font-semibold text-gray-900'>1</p>
              <Button
                variant={'outline'}
                type='button'
                size={'icon'}
                className='p-[10px]'
              >
                <Icons.plus />
              </Button>
            </div>
            <Button className='w-full'>เพิ่มลงตะกร้า</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
    // <Drawer.Root>
    //   <Drawer.Trigger>{children}</Drawer.Trigger>
    //   <Drawer.Portal>
    //     <Drawer.Content>
    //     </Drawer.Content>
    //     <Drawer.Overlay />
    //   </Drawer.Portal>
    // </Drawer.Root>
  )
}

export default ProductDrawer
