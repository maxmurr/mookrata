import { Order, OrderStatus } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTranslationOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.pending:
      return 'ได้รับออเดอร์แล้ว'
    case OrderStatus.processing:
      return 'กำลังเตรียมอาหาร...'
    case OrderStatus.completed:
      return 'เสิร์ฟแล้ว'
    default:
      return 'ได้รับออเดอร์แล้ว'
  }
}
