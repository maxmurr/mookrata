import { OrderStatus } from '@prisma/client'

type OrderStatusObject = {
  language: {
    th: string
    en: string
  }
  value: OrderStatus
}

export const orderStatus = [
  {
    language: {
      th: 'ได้รับออเดอร์แล้ว',
      en: 'Pending',
    },
    value: 'pending',
  },
  {
    language: {
      th: 'กำลังเตรียมอาหาร...',
      en: 'Processing',
    },
    value: 'processing',
  },
  {
    language: {
      th: 'เสิร์ฟแล้ว',
      en: 'Completed',
    },
    value: 'completed',
  },
] satisfies OrderStatusObject[]
