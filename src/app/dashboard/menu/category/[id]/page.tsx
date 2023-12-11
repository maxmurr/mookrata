import Link from 'next/link'
import React from 'react'
import { Icons } from '../../../../../components/icons'
import CreateCategoryForm from '../../../../../components/form/create-category-form'
import { Button } from '../../../../../components/ui/button'
import CreateProductDrawer from '../../../../../components/drawer/create-product-drawer'
import { getServerAuthSession } from '../../../../../server/auth'
import { notFound, redirect } from 'next/navigation'
import { getCategoryById } from '../../../../../lib/actions/category'
import EditCategoryForm from '../../../../../components/form/edit-category-form'
import { Category } from '@prisma/client'
import MenuCard from '../../../../../components/menu-card'
import EditProductDrawer from '../../../../../components/drawer/edit-product-drawer'
import { ScrollArea } from '../../../../../components/ui/scroll-area'

type EditCategoryPageProps = {
  params: {
    id: string
  }
}

const EditCategoryPage = async ({ params }: EditCategoryPageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const category = await getCategoryById(Number(params.id))

  if (!category?.id) {
    return notFound()
  }

  return (
    <main className='h-screen'>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link href={`/dashboard/menu`} legacyBehavior>
          <div className='flex items-center'>
            <div className='flex p-[10px] justify-center items-center '>
              <Icons.arrow_left className='w-5 h-5' />
            </div>
            <p className='text-gray-900 text-center text-xl font-semibold'>
              แก้ไขหมวดหมู่
            </p>
          </div>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-start items-start gap-4 flex-1'>
        <EditCategoryForm category={category as unknown as Category} />
      </section>
      <div className='flex items-start justify-between w-full px-4 py-2'>
        <p className='text-lg font-semibold'>รายการอาหาร</p>
        <CreateProductDrawer categoryId={category?.id}>
          <Button
            variant='outline'
            className=' py-[10px] px-[14px] gap-2 items-center flex justify-center'
          >
            <Icons.plus className=' fill-white w-5 h-5' />
            <p>เพิ่มรายการ</p>
          </Button>
        </CreateProductDrawer>
      </div>
      {!!category.products?.length ? (
        <div className='w-full gap-4'>
          <ScrollArea className='flex flex-col gap-4 max-h-96'>
            <section className='grid grid-cols-2 p-4 gap-4 h-full'>
              {category.products.map(product => (
                <EditProductDrawer
                  key={product.id}
                  product={product}
                  categoryId={category.id}
                >
                  <MenuCard
                    name={product.name}
                    price={product.price}
                    imageUrl={product.image}
                    id={product.id}
                  />
                </EditProductDrawer>
              ))}
            </section>
          </ScrollArea>
        </div>
      ) : (
        <div className='flex p-4 m-auto flex-col justify-center items-center gap-4 flex-1 h-full'>
          <p className='text-base font-medium text-gray-500'>
            ยังไม่มีรายการอาหาร
          </p>
        </div>
      )}
    </main>
  )
}

export default EditCategoryPage
