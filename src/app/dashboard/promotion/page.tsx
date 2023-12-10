import React from 'react'
import Link from 'next/link'
import Header from '../../../components/header'
import { Button } from '../../../components/ui/button'
import { Icons } from '../../../components/icons'
import { redirect } from 'next/navigation'
import { getServerAuthSession } from '../../../server/auth'
import { getPromotions } from '../../../lib/actions/promotion'
import MenuCard from '../../../components/menu-card'

const PromotionPage = async () => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const promotions = await getPromotions()

  return (
    <main className='h-screen'>
      <div className='flex py-0 px-4 flex-col items-start gap-2 border-b'>
        <div className='w-full mt-2'>
          <Header />
        </div>
        <div className='flex items-start gap-3'>
          <Link href={'/dashboard/table'} legacyBehavior>
            <div className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'>
              <p className='text-sm font-semibold text-gray-500'>จัดการโต๊ะ</p>
            </div>
          </Link>
          <Link href={'/dashboard/promotion'} legacyBehavior>
            <div className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-2 pl-1 border-b-2 border-brand'>
              <p className='text-sm font-semibold text-brand'>
                จัดการโปรโมชั่น
              </p>
            </div>
          </Link>
          <Link href={'/dashboard/menu'} legacyBehavior>
            <div className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'>
              <p className='text-sm font-semibold text-gray-500'>จัดการเมนู</p>
            </div>
          </Link>
        </div>
      </div>
      <section className='flex p-4 flex-col items-start gap-4 flex-1'>
        <div className='flex items-start justify-between w-full'>
          <p className='text-lg font-semibold'>รายการโปรโมชันทั้งหมด</p>
          <Link href={'/dashboard/promotion/create'} legacyBehavior>
            <Button className='text-white py-[10px] px-[14px] gap-2 items-center flex justify-center'>
              <Icons.plus className='text-white fill-white w-5 h-5' />
              <p>เพิ่มรายการ</p>
            </Button>
          </Link>
        </div>
      </section>
      {!!promotions.length ? (
        <section className='grid grid-cols-2 items-start gap-4 w-full p-4'>
          {promotions.map(promotion => (
            <Link
              href={`/dashboard/promotion/${promotion.id}`}
              key={promotion.id}
              legacyBehavior
            >
              <MenuCard
                name={promotion.name}
                price={promotion.price}
                imageUrl={promotion.image}
                id={promotion.id}
              />
            </Link>
          ))}
        </section>
      ) : (
        <div className='flex justify-center items-center w-full h-full'>
          <p className='text-gray-500 text-base font-medium'>
            ยังไม่มีรายการโปรโมชัน
          </p>
        </div>
      )}
    </main>
  )
}

export default PromotionPage
