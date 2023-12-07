import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import { Icons } from '../../../components/icons'

const TablePage = () => {
  return (
    <main>
      <div className='flex py-0 px-4 flex-col items-start gap-2 border-b'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-2'>
            <Image src='/images/logo.png' alt='logo' width={40} height={40} />
            <p className='text-lg font-semibold text-gray-900'>
              Glamorous Mookrata
            </p>
          </div>
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex items-start gap-3'>
          <Link
            href={'/dashboard/table'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-2 pl-1 border-b-2 border-brand'
          >
            <p className='text-sm font-semibold text-brand'>จัดการโต๊ะ</p>
          </Link>
          <Link
            href={'/dashboard/promotion'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'
          >
            <p className='text-sm font-semibold text-gray-500'>
              จัดการโปรโมชั่น
            </p>
          </Link>
          <Link
            href={'/dashboard/menu'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'
          >
            <p className='text-sm font-semibold text-gray-500'>จัดการเมนู</p>
          </Link>
          <Link
            href={'/dashboard/transaction'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1 '
          >
            <p className='text-sm font-semibold text-gray-500'>Transaction</p>
          </Link>
        </div>
      </div>
      <section className='flex p-4 flex-col items-start gap-4 flex-1'>
        <div className='flex items-start justify-between w-full'>
          <p className='text-lg font-semibold'>โต๊ะทั้งหมด</p>
          <Button className='text-white py-[10px] px-[14px] gap-2 items-center flex justify-center'>
            <Icons.plus className='text-white fill-white w-5 h-5' />
            <p>เพิ่มโต๊ะ</p>
          </Button>
        </div>
        <div className='grid grid-cols-2 w-full gap-4'>
          <Link
            href='#'
            className='flex h-[173px] p-4 flex-col justify-center items-center gap-2 flex-1 border border-gray-200 rounded-md'
          >
            <p className='text-xl text-black font-semibold'>โต๊ะ 1</p>
            <p className='text-green-700 text-base'>ว่าง</p>
          </Link>
          <Link
            href={'#'}
            className='flex h-[173px] p-4 flex-col justify-center items-center gap-2 flex-1 border border-gray-200 rounded-md'
          >
            <p className='text-xl text-black font-semibold'>โต๊ะ 2</p>
            <p className='text-red-700 text-base'>ไม่ว่าง</p>
          </Link>
          <div className='flex h-[173px] p-4 flex-col justify-center items-center gap-2 flex-1 border border-gray-200 rounded-md'>
            <p className='text-xl text-black font-semibold'>โต๊ะ 3</p>
            <p className='text-green-700 text-base'>ว่าง</p>
          </div>
          <div className='flex h-[173px] p-4 flex-col justify-center items-center gap-2 flex-1 border border-gray-200 rounded-md'>
            <p className='text-xl text-black font-semibold'>โต๊ะ 4</p>
            <p className='text-red-700 text-base'>ไม่ว่าง</p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TablePage
