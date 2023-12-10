import React from 'react'
import { Icons } from '../../../../components/icons'
import QRCode from 'react-qr-code'
import Link from 'next/link'
import { getTableById } from '../../../../lib/actions/table'
import { notFound, redirect } from 'next/navigation'
import { getServerAuthSession } from '../../../../server/auth'

type QrcodePageProps = {
  params: {
    id: string
  }
}

const QrcodePage = async ({ params }: QrcodePageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const table = await getTableById(Number(params.id))

  if (!table?.id) {
    return notFound()
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link
          href={`/dashboard/table/${table.id}`}
          className='flex items-center'
          legacyBehavior>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            QR Code สำหรับ {table.name}
          </p>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-center gap-4 flex-1 h-full'>
        <QRCode
          value={`http://localhost:3000/${table.qrCode}/${table.id}/table`}
        />
        <p className='text-xl font-semibold'>แสกนเพื่อสั่งอาหาร</p>
      </section>
    </main>
  );
}

export default QrcodePage
