import React from 'react'
import { Icons } from '../../../components/icons'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs'
import MenuItem from '../../../components/menu-item'
import { Button } from '../../../components/ui/button'
import { ScrollArea } from '../../../components/ui/scroll-area'

const Order = () => {
  return (
    <main>
      <div className='flex h-16 p-2 items-center gap-2 shrink-0 border-b'>
        <div className='flex p-[10px] justify-center items-center '>
          <Icons.arrow_left className='w-5 h-5' />
        </div>
        <p className='text-gray-900 text-center text-xl font-semibold'>
          รายการอาหาร
        </p>
      </div>
      <section className='container mx-auto p-4 flex flex-col items-center justify-center space-y-4 flex-1'>
        <Tabs
          defaultValue='ordering'
          className='w-full justify-center items-center flex flex-col space-y-4'
        >
          <TabsList className='w-full'>
            <TabsTrigger value='ordering' className='w-full'>
              รายการอาหารที่รอสั่ง
            </TabsTrigger>
            <TabsTrigger value='ordered' className='w-full'>
              รายการอาหารที่สั่งไปแล้ว
            </TabsTrigger>
          </TabsList>
          <TabsContent value='ordering' className='w-full'>
            <ScrollArea className='w-full max-h-[700px] overflow-y-auto'>
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
            </ScrollArea>
            <div className='flex w-full p-4 items-center gap-4 border-t mt-4 absolute bottom-0 right-0'>
              <Button className='w-full'>สั่งอาหารเลย!</Button>
            </div>
          </TabsContent>
          <TabsContent value='ordered' className='w-full'>
            <ScrollArea className='w-full max-h-80 overflow-y-auto'>
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
              <MenuItem name='หมูสไลด์' />
            </ScrollArea>
            <div className='flex w-full p-4 items-center justify-between gap-4 border-t mt-4 absolute bottom-0 right-0'>
              <p className='text-lg font-semibold text-gray-900'>รวมทั้งหมด</p>
              <p className='text-ls font-semibold text-gray-900'>1,500 บาท</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

export default Order
