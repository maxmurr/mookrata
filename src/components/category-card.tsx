import Image from 'next/image'
import React from 'react'
import { AspectRatio } from './ui/aspect-ratio'

type CategoryCardProps = {
  name: string
  imageUrl: string | null
}

const CategoryCard = ({ name, imageUrl }: CategoryCardProps) => {
  return (
    <div className='flex p-3 justify-between items-start flex-1 gap-2 rounded-lg bg-gray-50 w-full'>
      <p className='text-gray-900 text-sm font-medium'>{name}</p>
      <AspectRatio ratio={16 / 9} className='h-20 flex justify-end'>
        <Image
          src={imageUrl ? imageUrl : '/images/pork.png'}
          alt='pork'
          className='rounded-lg'
          fill
          objectFit='cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </AspectRatio>
    </div>
  )
}

export default CategoryCard
