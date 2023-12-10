import Link from 'next/link'
import React from 'react'
import { Icons } from '../../../../components/icons'
import CreateCategoryForm from '../../../../components/form/create-category-form'
import { getServerAuthSession } from '../../../../server/auth'
import { redirect } from 'next/navigation'
import CreateProductDrawer from '../../../../components/drawer/create-product-drawer'
import { Button } from '../../../../components/ui/button'

const CreateCategoryPage = async () => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link href={`/dashboard/menu`} className='flex items-center' legacyBehavior>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            เพิ่มหมวดหมู่
          </p>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
        <CreateCategoryForm />
      </section>
    </main>
  );
}

export default CreateCategoryPage
