import React from 'react'
import { Icons } from '../../../../components/icons'
import QRCode from 'react-qr-code'
import Image from 'next/image'
import { Button } from '../../../../components/ui/button'

const BillingPage = () => {
  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <div className='flex items-center'>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            ชำระเงิน
          </p>
        </div>
      </div>
      <section className='flex p-4 flex-col justify-center items-center gap-4 flex-1 h-full'>
        <Image
          src='/images/prompt_pay.png'
          width={160}
          height={53}
          alt='prompt-pay'
        />
        <QRCode value='hey' />
        <p className='text-base font-semibold'>แสกนเพื่อชำระเงิน</p>
        <div className='flex justify-between items-start w-full'>
          <p className='text-gray-900'>จำนวน</p>
          <p className='text-gray-900'>1,600 บาท</p>
        </div>
        <div className='flex justify-between items-start w-full'>
          <p className='text-gray-900'>เข้าหมายเลขพร้อมเพย์</p>
          <p className='text-gray-900'>0xx-xxx-xxxx</p>
        </div>
        <div className='flex justify-between items-start w-full'>
          <p className='text-gray-900'>ชื่อบัญชี</p>
          <p className='text-gray-900'>นาย แม็กทอมมัส เมอร์เรย์</p>
        </div>
      </section>
      <div className='flex w-full p-4 items-center justify-between gap-4 border-t mt-4 absolute bottom-0 right-0'>
        <Button className='w-full'>ยืนยันการชำระเงิน</Button>
      </div>
    </main>
  )
}

export default BillingPage
