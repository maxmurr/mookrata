/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { cn } from '../lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'
import { AspectRatio } from './ui/aspect-ratio'

type MenuCardProps = {
  name: string
  price: number
  imageUrl?: string | null
  id?: number
  classNames?: string
}

const MenuCard = ({ name, price, imageUrl, id, classNames }: MenuCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col justify-between items-start gap-1 min-w-[160px] max-h-60 min-h-[230px]',
        classNames
      )}
    >
      <AspectRatio ratio={16 / 9} className='h-40 w-full'>
        <Image
          src={imageUrl ? imageUrl : '/images/promotion.jpeg'}
          alt='promotion'
          fill
          objectFit='cover'
          className='rounded-lg object-cover h-40'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </AspectRatio>
      <div className='flex flex-col gap-1'>
        <p className='text-gray-900 text-sm'>{name}</p>
        <p className='text-gray-900 text-sm font-semibold'>{price} บาท</p>
        {id && <p className='text-brand text-sm font-semibold'>แก้ไข</p>}
      </div>
    </div>
  )
}

export default MenuCard
