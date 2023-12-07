import Image from 'next/image'
import React from 'react'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'

const SignInPage = () => {
  return (
    <main className='container mx-auto py-8 px-4 flex flex-col items-center gap-4 flex-1'>
      <Image src='/images/logo.png' alt='logo' width={120} height={120} />
      <p className='text-2xl font-semibold text-gray-900'>เข้าสู่ระบบ</p>
      <form className='space-y-4 flex flex-col w-full'>
        <Label>ชื่อผู้ใช้</Label>
        <Input
          name='name'
          className='w-full'
          placeholder='กรอกชื่อผู้ใช้งานของคุณ'
        />
        <Label>รหัสผ่าน</Label>
        <Input
          name='password'
          className='w-full'
          placeholder='กรอกรหัสผ่านของคุณ'
        />
        <Button className='w-full'>เข้าสู่ระบบ</Button>
      </form>
    </main>
  )
}

export default SignInPage
