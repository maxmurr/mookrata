/* eslint-disable @next/next/no-img-element */
import React from 'react'

type MenuItemProps = {
  name: string
  imageUrl?: string
}

const MenuItem = ({ name, imageUrl }: MenuItemProps) => {
  return (
    <div className='flex h-20 justify-between items-start w-full'>
      <div className='flex items-start gap-4'>
        <div className='flex py-[2px] px-[9px] justify-center items-center rounded-[4px] border border-gray-200'>
          2
        </div>
        <p className='text-base text-gray-900'>{name}</p>
      </div>
      <img
        src='/images/pork.png'
        alt='pork'
        className='h-20 w-20 rounded-lg object-cover'
      />
    </div>
  )
}

export default MenuItem
