/* eslint-disable @next/next/no-img-element */
import React from 'react'

type CategoryCardProps = {
  name: string
  imageUrl: string | null
}

const CategoryCard = ({ name, imageUrl }: CategoryCardProps) => {
  return (
    <div className='flex p-3 justify-between items-start flex-1 rounded-lg bg-gray-50 w-full'>
      <p className='text-gray-900 text-sm font-medium'>{name}</p>
      <img
        src={imageUrl ? imageUrl : '/images/promotion.png'}
        alt='pork'
        className='h-20 w-20 rounded-lg object-cover'
      />
    </div>
  )
}

export default CategoryCard
