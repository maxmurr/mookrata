import React from 'react'
import { Icons } from '../../../../components/icons'
import { Button } from '../../../../components/ui/button'
import QRCode from 'react-qr-code'

const QrcodePage = () => {
  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <div className='flex items-center'>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            QR Code สำหรับโต๊ะ 1
          </p>
        </div>
      </div>
      <section className='flex p-4 flex-col justify-center items-center gap-4 flex-1 h-full'>
        <QRCode value='hey' />
        <p className='text-xl font-semibold'>แสกนเพื่อสั่งอาหาร</p>
      </section>
    </main>
  )
}

export default QrcodePage
