import React from 'react'
import { Icons } from '../../../../components/icons'
import Image from 'next/image'
import { Button } from '../../../../components/ui/button'
import { getServerAuthSession } from '../../../../server/auth'
import { notFound, redirect } from 'next/navigation'
import { getTableById } from '../../../../lib/actions/table'
import Link from 'next/link'
import PayButton from '../../../../components/pay-button'

type BillingPageProps = {
  params: {
    tableId: string
  }
}

const BillingPage = async ({ params }: BillingPageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
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
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link
          href={`/dashboard/table/${params.tableId}`}
          className='flex items-center'
          legacyBehavior>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            ชำระเงิน
          </p>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-center gap-4 flex-1 h-full'>
        <Image
          src='/images/prompt_pay.png'
          width={160}
          height={53}
          alt='prompt-pay'
        />
        <Image
          src={`https://promptpay.io/0646504306/${calculateTotalOrderPrice()}.png`}
          alt='prompt-pay'
          width={240}
          height={240}
        />
        <p className='text-base font-semibold'>แสกนเพื่อชำระเงิน</p>
        <div className='flex justify-between items-start w-full'>
          <p className='text-gray-900'>จำนวน</p>
          <p className='text-gray-900 font-semibold'>
            {calculateTotalOrderPrice()} บาท
          </p>
        </div>
        <div className='flex justify-between items-start w-full'>
          <p className='text-gray-900'>เข้าหมายเลขพร้อมเพย์</p>
          <p className='text-gray-900 font-semibold'>0xx-xxx-xxxx</p>
        </div>
        <div className='flex justify-between items-start w-full'>
          <p className='text-gray-900'>ชื่อบัญชี</p>
          <p className='text-gray-900 font-semibold'>นาย สมชาย ใจดี</p>
        </div>
      </section>
      <div className='flex w-full p-4 items-center justify-between gap-4 border-t mt-4 fixed bottom-0 right-0'>
        <PayButton tableId={Number(params.tableId)} />
      </div>
    </main>
  );
}

export default BillingPage
