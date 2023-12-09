import React from 'react'
import { Icons } from '../../../../components/icons'
import { Button } from '../../../../components/ui/button'
import Image from 'next/image'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { getTableById } from '../../../../lib/actions/table'
import EditTableDrawer from '../../../../components/drawer/edit-table-drawer'
import { notFound, redirect } from 'next/navigation'
import DeleteTableDrawer from '../../../../components/drawer/delete-table-drawer'
import CreateQrButton from '../../../../components/create-qr-button'
import { getServerAuthSession } from '../../../../server/auth'
import { Product, Table } from '@prisma/client'
import { getTranslationOrderStatus } from '../../../../lib/utils'
import OrderStatusDrawer from '../../../../components/drawer/order-status-drawer'

type TablePageProps = {
  params: {
    id: string
  }
}

const TablePage = async ({ params }: TablePageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const table = await getTableById(Number(params.id))

  if (!table?.id) {
    return notFound()
  }

  const calculateTotalOrderPrice = () => {
    let total = 0

    table.orders?.forEach(order => {
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
    <main className='h-screen'>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link href={'/dashboard/table'} className='flex items-center'>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            {table.name}
          </p>
        </Link>
        {table.qrCode ? (
          <Link href={`/dashboard/qrcode/${table.id}`}>
            <Button variant={'outline'} className='flex gap-2 items-center'>
              <Icons.qrcode className='w-5 h-5' />
              <p>ดู QR Code</p>
            </Button>
          </Link>
        ) : (
          <div className='flex gap-2'>
            <EditTableDrawer table={table as unknown as Table}>
              <Button variant={'outline'} size={'icon'}>
                <Icons.pencil className='w-5 h-5' />
              </Button>
            </EditTableDrawer>
            <DeleteTableDrawer table={table}>
              <Button variant={'outline'} size={'icon'}>
                <Icons.trash className='w-5 h-5 text-red-700' />
              </Button>
            </DeleteTableDrawer>
          </div>
        )}
      </div>
      {!table.qrCode && (
        <section className='flex p-4 flex-col w-full justify-center items-center gap-4 flex-1 h-full'>
          <Image src='/images/table.png' alt='table' width={360} height={360} />
          <div className='flex justify-center items-center'>
            <div className='flex flex-col items-center gap-6 flex-1'>
              <div className='flex flex-col items-center gap-4'>
                <div className='flex max-w-[352px] flex-col items-center gap-1'>
                  <p className='text-base font-semibold text-gray-900'>
                    ลูกค้ามาแล้ว?
                  </p>
                  <p className='text-sm text-gray-600'>
                    สร้าง QR Code สำหรับสั่งอาหารเลย
                  </p>
                </div>
              </div>
              <CreateQrButton tableId={Number(table.id)} qrCode={nanoid()} />
            </div>
          </div>
        </section>
      )}
      {table.qrCode && !!table.orders?.length && (
        <section className='flex p-4 flex-col justify-start items-start gap-4 flex-1 h-full'>
          {table.orders.map((order, index) => (
            <div
              key={order.id}
              className='flex flex-col items-start gap-8 w-full pb-4 border-b'
            >
              <div className='flex items-start gap-4 w-full justify-between'>
                <div className='flex flex-col items-start gap-1 flex-1'>
                  <p className='text-lg text-gray-900 font-semibold'>
                    รายการที่ {index + 1}
                  </p>
                  <p
                    className={`${
                      order.status === 'completed'
                        ? 'text-green-700'
                        : 'text-gray-700'
                    } text-sm`}
                  >
                    {getTranslationOrderStatus(order.status)}
                  </p>
                </div>
                <OrderStatusDrawer index={index} order={order}>
                  <Button
                    variant={'link'}
                    className='p-0 items-start justify-center'
                  >
                    อัปเดตสถานะ
                  </Button>
                </OrderStatusDrawer>
              </div>
              {order.productCart?.productCartItems.map(
                (item: { id: number; product: Product; quantity: number }) => (
                  <div
                    key={item.id}
                    className='flex w-full justify-between items-start'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='flex py-[2px] px-[9px] justify-center items-center rounded-[4px] border border-gray-200'>
                        {item.quantity}
                      </div>
                      <p className='text-base text-gray-900'>
                        {item.product.name}
                      </p>
                    </div>
                    <p className='text-base font-semibold text-gray-900'>
                      {item.product.price} บาท
                    </p>
                  </div>
                )
              )}
              {order.promotionCart?.promotionCartItems.map(
                (item: {
                  id: number
                  promotion: { name: string; price: number }
                  quantity: number
                }) => (
                  <div
                    key={item.id}
                    className='flex w-full justify-between items-start'
                  >
                    <div className='flex items-start gap-4'>
                      <div className='flex py-[2px] px-[9px] justify-center items-center rounded-[4px] border border-gray-200'>
                        {item.quantity}
                      </div>
                      <p className='text-base text-gray-900'>
                        {item.promotion.name}
                      </p>
                    </div>
                    <p className='text-base font-semibold text-gray-900'>
                      {item.promotion.price} บาท
                    </p>
                  </div>
                )
              )}
            </div>
          ))}
          <div className='flex w-full p-4 items-center justify-between gap-4 border-t mt-4 fixed bottom-0 right-0'>
            <p className='text-lg font-semibold text-gray-900 w-full'>
              รวม {calculateTotalOrderPrice().toFixed(2)} บาท
            </p>
            <Button className='w-full'>ชำระเงิน</Button>
          </div>
        </section>
      )}
      {table.qrCode && !table.orders?.length && (
        <section className='flex p-4 m-auto flex-col justify-center items-center gap-4 flex-1 h-full'>
          <p className='text-base font-medium text-gray-500'>ยังไม่มีรายการ</p>
        </section>
      )}
    </main>
  )
}

export default TablePage
