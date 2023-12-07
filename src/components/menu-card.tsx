/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { cn } from '../lib/utils'
import Image from 'next/image'

type MenuCardProps = {
  name: string
  price: number
  imageUrl?: string
  classNames?: string
  width?: number
}

const MenuCard = ({
  name,
  price,
  imageUrl,
  classNames,
  width,
}: MenuCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-1 min-w-[160px]',
        classNames
      )}
    >
      <Image
        src='/images/promotion.jpeg'
        alt='promotion'
        height={160}
        width={width}
        className='rounded-lg object-cover h-40'
      />
      <p className='text-gray-900 text-sm'>{name}</p>
      <p className='text-gray-900 text-sm font-semibold'>{price} บาท</p>
    </div>
  )
}

export default MenuCard
