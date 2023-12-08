import React from 'react'
import Link from 'next/link'
import Header from '../../../components/header'

const PromotionPage = () => {
  return (
    <main>
      <div className='flex py-0 px-4 flex-col items-start gap-2 border-b'>
        <div className='w-full mt-2'>
          <Header />
        </div>
        <div className='flex items-start gap-3'>
          <Link
            href={'/dashboard/table'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'
          >
            <p className='text-sm font-semibold text-gray-500'>จัดการโต๊ะ</p>
          </Link>
          <Link
            href={'/dashboard/promotion'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-2 pl-1 border-b-2 border-brand'
          >
            <p className='text-sm font-semibold text-brand'>จัดการโปรโมชั่น</p>
          </Link>
          <Link
            href={'/dashboard/menu'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'
          >
            <p className='text-sm font-semibold text-gray-500'>จัดการเมนู</p>
          </Link>
        </div>
      </div>
      <section className='flex p-4 flex-col items-start gap-4 flex-1'></section>
    </main>
  )
}

export default PromotionPage
