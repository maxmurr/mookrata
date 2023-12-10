import React from 'react'
import { getServerAuthSession } from '../../../../../server/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Icons } from '../../../../../components/icons'
import CategoryCard from '../../../../../components/category-card'
import { getCategories } from '../../../../../lib/actions/category'

type CategoryPageProps = {
  params: {
    id: string
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const categories = await getCategories()

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link href={`/dashboard/promotion/${params.id}`} legacyBehavior>
          <div className='flex items-center'>
            <div className='flex p-[10px] justify-center items-center '>
              <Icons.arrow_left className='w-5 h-5' />
            </div>
            <p className='text-gray-900 text-center text-xl font-semibold'>
              เพิ่มรายการอาหาร
            </p>
          </div>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
        <p className='text-gray-900 font-semibold text-lg'>หมวดหมู่</p>
        <div className='grid grid-cols-2 w-full gap-4'>
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/dashboard/promotion/${params.id}/category/${category.id}`}
              legacyBehavior
            >
              <CategoryCard name={category.name} imageUrl={category.image} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default CategoryPage
