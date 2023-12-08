import React from 'react'
import Link from 'next/link'
import Header from '../../../components/header'
import { Button } from '../../../components/ui/button'
import { Icons } from '../../../components/icons'
import { getServerAuthSession } from '../../../server/auth'
import { redirect } from 'next/navigation'
import { getCategories } from '../../../lib/actions/category'
import MenuCard from '../../../components/menu-card'
import CategoryCard from '../../../components/category-card'

const MenuPage = async () => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const categories = await getCategories()

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
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'
          >
            <p className='text-sm font-semibold text-gray-500'>
              จัดการโปรโมชั่น
            </p>
          </Link>
          <Link
            href={'/dashboard/menu'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-2 pl-1 border-b-2 border-brand'
          >
            <p className='text-sm font-semibold text-brand'>จัดการเมนู</p>
          </Link>
        </div>
      </div>
      <section className='flex p-4 flex-col items-start gap-4 flex-1 w-full'>
        <div className='flex items-start justify-between w-full'>
          <p className='text-lg font-semibold'>หมวดหมู่อาหาร</p>
          <Link href={'/dashboard/menu/category'}>
            <Button className='text-white py-[10px] px-[14px] gap-2 items-center flex justify-center'>
              <Icons.plus className='text-white fill-white w-5 h-5' />
              <p>เพิ่มหมวดหมู่</p>
            </Button>
          </Link>
        </div>
        <div className='grid grid-cols-2 w-full gap-4'>
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/dashboard/menu/category/${category.id}`}
            >
              <CategoryCard name={category.name} imageUrl={category.image} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default MenuPage
