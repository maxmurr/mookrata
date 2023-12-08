import React from 'react'
import { getServerAuthSession } from '../../../../server/auth'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Icons } from '../../../../components/icons'
import CreatePromotionForm from '../../../../components/form/create-promotion-form'
import { Button } from '../../../../components/ui/button'
import { getPromotionById } from '../../../../lib/actions/promotion'
import EditPromotionForm from '../../../../components/form/edit-promotion-form'
import { Promotion } from '@prisma/client'

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

  const promotion = await getPromotionById(Number(params.id))

  if (!promotion?.id) {
    return notFound()
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link href={`/dashboard/promotion`} className='flex items-center'>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            แก้ไขรายการโปรโมชัน
          </p>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
        <EditPromotionForm promotion={promotion as unknown as Promotion} />
      </section>
      <div className='flex items-start justify-between w-full px-4 py-2'>
        <p className='text-lg font-semibold'>รายการอาหาร</p>
        <Link href={`/dashboard/promotion/${promotion.id}/category`}>
          <Button
            variant='outline'
            className=' py-[10px] px-[14px] gap-2 items-center flex justify-center'
          >
            <Icons.plus className=' fill-white w-5 h-5' />
            <p>เพิ่มรายการ</p>
          </Button>
        </Link>
      </div>
    </main>
  )
}

export default EditPromotionPage
