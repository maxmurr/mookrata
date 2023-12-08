import { redirect } from 'next/navigation'
import React from 'react'
import { getServerAuthSession } from '../../../../../../server/auth'
import { getCategoryById } from '../../../../../../lib/actions/category'
import Link from 'next/link'
import { Icons } from '../../../../../../components/icons'
import MenuCard from '../../../../../../components/menu-card'

type ProductPageProps = {
  params: {
    id: string
    categoryId: string
  }
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const category = await getCategoryById(Number(params.categoryId))

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link
          href={`/dashboard/promotion/${params.id}/category`}
          className='flex items-center'
        >
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            {category?.name}
          </p>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
        <div className='grid grid-cols-2 w-full gap-4'>
          {category?.products.map(product => (
            <MenuCard
              key={product.id}
              name={product.name}
              price={product.price}
              imageUrl={product.image}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default ProductPage
