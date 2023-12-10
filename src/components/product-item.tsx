/* eslint-disable @next/next/no-img-element */
import { OrderStatus } from '@prisma/client'
import React from 'react'
import { getTranslationOrderStatus } from '../lib/utils'
import Image from 'next/image'
import { AspectRatio } from './ui/aspect-ratio'

type ProductItemProps = {
  name: string
  imageUrl?: string | null
  quantity: number
  isEdit?: boolean
  status?: OrderStatus
}

const ProductItem = ({
  name,
  imageUrl,
  quantity,
  isEdit,
  status,
}: ProductItemProps) => {
  return (
    <div className='flex h-20 justify-between items-start w-full'>
      <div className='flex items-start gap-4'>
        <div className='flex py-[2px] px-[9px] justify-center items-center rounded-[4px] border border-gray-200'>
          {quantity}
        </div>
        <div className='flex flex-col items-start gap-2'>
          <p className='text-base text-gray-900 whitespace-nowrap'>{name}</p>
          {isEdit && <p className='text-brand text-sm font-semibold'>แก้ไข</p>}
          {status && (
            <p
              className={`${
                status === 'completed' ? 'text-green-700' : 'text-gray-700'
              } text-sm`}
            >
              {getTranslationOrderStatus(status)}
            </p>
          )}
        </div>
      </div>
      <div className='w-20 h-20'>
        <AspectRatio ratio={16 / 9} className='h-20'>
          <Image
            src={imageUrl ? imageUrl : '/images/bacon.jpeg'}
            alt='pork'
            fill
            objectFit='cover'
            className='rounded-lg flex justify-end'
          />
        </AspectRatio>
      </div>
    </div>
  )
}

export default ProductItem
