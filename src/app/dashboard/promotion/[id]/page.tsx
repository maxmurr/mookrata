import React from 'react'
import { getServerAuthSession } from '../../../../server/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Icons } from '../../../../components/icons'
import CreatePromotionForm from '../../../../components/form/create-promotion-form'
import { Button } from '../../../../components/ui/button'

type EditPromotionPageProps = {
  params: {
    id: string
  }
}

const EditPromotionPage = async ({ params }: EditPromotionPageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

	// const promotion = await getPromtionById(Number(params.id))

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link href={`/dashboard/promotion`} className='flex items-center'>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            เพิ่มรายการโปรโมชัน
          </p>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
        <CreatePromotionForm />
      </section>
      <div className='flex items-start justify-between w-full px-4 py-2'>
        <p className='text-lg font-semibold'>รายการอาหาร</p>
        <Button
          variant='outline'
          className=' py-[10px] px-[14px] gap-2 items-center flex justify-center'
        >
          <Icons.plus className=' fill-white w-5 h-5' />
          <p>เพิ่มรายการ</p>
        </Button>
      </div>
    </main>
  )
}

export default EditPromotionPage
