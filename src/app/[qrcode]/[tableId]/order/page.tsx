import React from 'react'
import { Icons } from '../../../../components/icons'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../components/ui/tabs'
import { Button } from '../../../../components/ui/button'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { isValideQrCode } from '../../../../lib/actions/qrcode'
import { notFound } from 'next/navigation'
import ProductItem from '../../../../components/product-item'
import Link from 'next/link'
import OrderList from '../../../../components/cart-list'
import CartList from '../../../../components/cart-list'

type OrderPageProps = {
  params: {
    qrcode: string
    tableId: string
  }
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const isValidQrCode = await isValideQrCode(
    Number(params.tableId),
    params.qrcode
  )

  if (!isValidQrCode) {
    return notFound()
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center gap-2 shrink-0 border-b'>
        <Link
          href={`/${params.qrcode}/${params.tableId}/table`}
          className='flex items-center'
        >
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            รายการอาหาร
          </p>
        </Link>
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
            <CartList tableId={Number(params.tableId)} qrCode={params.qrcode} />
          </TabsContent>
          <TabsContent value='ordered' className='w-full'>
            <ScrollArea className='w-full max-h-80 overflow-y-auto'>
              <ProductItem name='หมูสไลด์' quantity={0} />
              <ProductItem name='หมูสไลด์' quantity={0} />
            </ScrollArea>
            <div className='flex w-full p-4 items-center justify-between gap-4 border-t mt-4 fixed bottom-0 right-0'>
              <p className='text-lg font-semibold text-gray-900'>รวมทั้งหมด</p>
              <p className='text-ls font-semibold text-gray-900'>1,500 บาท</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  )
}

export default OrderPage
