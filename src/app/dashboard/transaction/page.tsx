import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback } from '../../../components/ui/avatar'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { getServerAuthSession } from '../../../server/auth'

const TransactionPage = async () => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  return (
    <main>
      <div className='flex py-0 px-4 flex-col items-start gap-2 border-b'>
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center gap-2'>
            <Image src='/images/logo.png' alt='logo' width={40} height={40} />
            <p className='text-lg font-semibold text-gray-900'>
              Glamorous Mookrata
            </p>
          </div>
          <Avatar>
            <AvatarFallback>GM</AvatarFallback>
          </Avatar>
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
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1 '
          >
            <p className='text-sm font-semibold text-gray-500'>จัดการเมนู</p>
          </Link>
          <Link
            href={'/dashboard/transaction'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-2 pl-1 border-b-2 border-brand '
          >
            <p className='text-sm font-semibold text-brand'>Transaction</p>
          </Link>
        </div>
      </div>
      <section className='flex p-4 flex-col items-start gap-4 flex-1'></section>
    </main>
  )
}

export default TransactionPage
