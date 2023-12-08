'use client'

import React from 'react'
import { Button } from './ui/button'
import { Icons } from './icons'
import { addQrCode } from '../lib/actions/table'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

type CreateQrButtonProps = {
  tableId: number
  qrCode: string
}

const CreateQrButton = ({ tableId, qrCode }: CreateQrButtonProps) => {
  const router = useRouter()

  return (
    <Button
      className='w-full flex gap-2'
      onClick={async () => {
        await addQrCode(tableId, qrCode)
          .then(() => {
            toast.success('สร้าง QR Code เรียบร้อยแล้ว')
            const escEvent = new KeyboardEvent('keydown', {
              key: 'Escape',
            })
            document.dispatchEvent(escEvent)
            router.push(`/dashboard/qrcode/${tableId}`)
            router.refresh()
          })
          .catch(() => {
            toast.error('สร้าง QR Code ไม่สำเร็จ')
          })
      }}
    >
      <Icons.qrcode className='w-5 h-5' />
      <p>สร้าง QR Code สำหรับสั่งอาหาร</p>
    </Button>
  )
}

export default CreateQrButton
