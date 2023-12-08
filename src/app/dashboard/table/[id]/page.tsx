import React from 'react'
import { Icons } from '../../../../components/icons'
import { Button } from '../../../../components/ui/button'
import Image from 'next/image'
import QRCode from 'react-qr-code'
import { nanoid } from 'nanoid'
import Link from 'next/link'
import { getTableById } from '../../../../lib/actions/table'
import EditTableDrawer from '../../../../components/drawer/edit-table-drawer'
import { notFound, redirect } from 'next/navigation'
import DeleteTableDrawer from '../../../../components/drawer/delete-table-drawer'
import CreateQrButton from '../../../../components/create-qr-button'
import { getServerAuthSession } from '../../../../server/auth'
import { Table } from '@prisma/client'

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
          <div className='flex flex-col items-start gap-8 w-full pb-4 border-b'>
            <p className='text-lg text-gray-900 font-semibold'>รายการที่ 1</p>
            <div className='flex w-full justify-between items-start'>
              <div className='flex items-start gap-4'>
                <div className='flex py-[2px] px-[9px] justify-center items-center rounded-[4px] border border-gray-200'>
                  2
                </div>
                <p className='text-base text-gray-900'>หมูสไลด์</p>
              </div>
              <p className='text-base font-semibold text-gray-900'>600 บาท</p>
            </div>
          </div>
          <div className='flex w-full p-4 items-center justify-between gap-4 border-t mt-4 fixed bottom-0 right-0'>
            <p className='text-lg font-semibold text-gray-900 w-full'>
              รวม 3,600 บาท
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
