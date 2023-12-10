'use client'

import React from 'react'
import { Button } from './ui/button'
import { disconnectOrderFromTable } from '../lib/actions/order'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type PayButtonProps = {
  tableId: number
}

const PayButton = ({ tableId }: PayButtonProps) => {
  const router = useRouter()
  return (
    <Button
      className='w-full'
      onClick={async () => {
        await disconnectOrderFromTable(tableId)
          .then(() => {
            toast.success('ชำระเงินเรียบร้อยแล้ว')
            router.push('/dashboard/table')
            router.refresh()
          })
          .catch(e => {
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
            console.log('Error: ', e)
          })
      }}
    >
      ยืนยันการชำระเงิน
    </Button>
  )
}

export default PayButton
