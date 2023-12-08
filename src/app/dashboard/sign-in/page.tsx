import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import React from 'react'
import { getServerAuthSession } from '../../../server/auth'
import SigninForm from '../../../components/form/sign-in-form'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account',
}

const SignInPage = async () => {
  const session = await getServerAuthSession()

  if (session) {
    redirect('/dashboard/table')
  }

  return (
    <main className='container mx-auto py-8 px-4 flex flex-col items-center gap-4 flex-1'>
      <Image
        src='/images/logo.png'
        alt='logo'
        width={120}
        height={120}
        priority
      />
      <p className='text-2xl font-semibold text-gray-900'>เข้าสู่ระบบ</p>
      <SigninForm />
    </main>
  )
}

export default SignInPage
