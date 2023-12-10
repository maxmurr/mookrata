import React from 'react'
import { getServerAuthSession } from '../../../../server/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Icons } from '../../../../components/icons'
import CreatePromotionForm from '../../../../components/form/create-promotion-form'
import { Button } from '../../../../components/ui/button'

const CreatePromotionPage = async () => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link href={`/dashboard/promotion`} legacyBehavior>
          <div className='flex items-center'>
            <div className='flex p-[10px] justify-center items-center '>
              <Icons.arrow_left className='w-5 h-5' />
            </div>
            <p className='text-gray-900 text-center text-xl font-semibold'>
              เพิ่มรายการโปรโมชัน
            </p>
          </div>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
        <CreatePromotionForm />
      </section>
    </main>
  )
}

export default CreatePromotionPage
