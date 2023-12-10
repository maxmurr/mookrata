import React from 'react'
import { Icons } from '../../../../components/icons'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../../components/ui/tabs'
import { ScrollArea } from '../../../../components/ui/scroll-area'
import { isValideQrCode } from '../../../../lib/actions/qrcode'
import { notFound } from 'next/navigation'
import ProductItem from '../../../../components/product-item'
import Link from 'next/link'
import CartList from '../../../../components/cart-list'
import { getTableById } from '../../../../lib/actions/table'

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

  const table = await getTableById(Number(params.tableId))

  const calculateTotalOrderPrice = () => {
    let total = 0

    table?.orders?.forEach(order => {
      order.productCart?.productCartItems?.forEach(item => {
        if (item.product && item.product.price && item.quantity) {
          total += item.product.price * item.quantity
        }
      })

      order.promotionCart?.promotionCartItems?.forEach(item => {
        if (item.promotion && item.promotion.price && item.quantity) {
          total += item.quantity * item.promotion.price
        }
      })
    })

    return total
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center gap-2 shrink-0 border-b'>
        <Link
          href={`/${params.qrcode}/${params.tableId}/table`}
          className='flex items-center'
          legacyBehavior>
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
            {!!table?.orders.length ? (
              <CartList tableId={Number(table.id)} qrCode={params.qrcode} />
            ) : (
              <div className='m-auto flex justify-center items-center h-screen'>
                <p className='text-base font-medium text-gray-500'>
                  ยังไม่มีรายการที่รอสั่ง
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value='ordered' className='w-full'>
            <ScrollArea className='w-full max-h-[700px] overflow-y-auto'>
              {!!table?.orders.length ? (
                <>
                  {table?.orders.map((order, orderIndex) => {
                    return order.productCart?.productCartItems?.map(
                      (item, itemIndex) => {
                        return (
                          <ProductItem
                            key={`${orderIndex}-${itemIndex}`}
                            name={item.product.name}
                            quantity={item.quantity}
                            status={order.status}
                          />
                        )
                      }
                    )
                  })}
                  {table?.orders.map((order, orderIndex) => {
                    return order.promotionCart?.promotionCartItems?.map(
                      (item, itemIndex) => {
                        return (
                          <ProductItem
                            key={`${orderIndex}-${itemIndex}`}
                            name={item.promotion.name}
                            quantity={item.quantity}
                            status={order.status}
                          />
                        )
                      }
                    )
                  })}
                </>
              ) : (
                <div className='m-auto flex justify-center items-center h-screen'>
                  <p className='text-base font-medium text-gray-500'>
                    ยังไม่มีรายการที่สั่งไปแล้ว
                  </p>
                </div>
              )}
            </ScrollArea>
            <div className='flex w-full p-4 items-center justify-between gap-4 border-t mt-4 fixed bottom-0 right-0'>
              <p className='text-lg font-semibold text-gray-900'>รวมทั้งหมด</p>
              <p className='text-ls font-semibold text-gray-900'>
                {calculateTotalOrderPrice().toFixed(2)} บาท
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}

export default OrderPage
