/* eslint-disable @next/next/no-img-element */
import React from 'react'

type ProductItemProps = {
  name: string
  imageUrl?: string | null
  quantity: number
  isEdit?: boolean
}

const ProductItem = ({
  name,
  imageUrl,
  quantity,
  isEdit,
}: ProductItemProps) => {
  return (
    <div className='flex h-20 justify-between items-start w-full'>
      <div className='flex items-start gap-4'>
        <div className='flex py-[2px] px-[9px] justify-center items-center rounded-[4px] border border-gray-200'>
          {quantity}
        </div>
        <div className='flex flex-col items-start gap-2'>
          <p className='text-base text-gray-900'>{name}</p>
          {isEdit && <p className='text-brand text-sm font-semibold'>แก้ไข</p>}
        </div>
      </div>
      <img
        src={imageUrl ? imageUrl : '/images/pork.png'}
        alt='pork'
        className='h-20 w-20 rounded-lg object-cover'
      />
    </div>
  )
}

export default ProductItem
