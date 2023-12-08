'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const signInSchema = z.object({
  name: z.string().min(2, { message: 'ชื่อสั้นเกินไป' }),
  password: z.string().min(8, { message: 'รหัสผ่านสั้นเกินไป' }),
})

type SignInput = z.infer<typeof signInSchema>

const SigninForm = () => {
  const form = useForm<SignInput>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInput) => {
    const { name, password } = data

    await signIn('credentials', {
      name,
      password,
      callbackUrl: '/dashboard/table',
      redirect: true,
    })
      .then(() => {
        toast.success('เข้าสู่ระบบสำเร็จ')
        const escEvent = new KeyboardEvent('keydown', { key: 'Escape' })
        document.dispatchEvent(escEvent)
      })
      .catch(e => {
        toast.error('เข้าสู่ระบบไม่สำเร็จ')
        console.log(e)
      })
  }
  return (
    <Form {...form}>
      <form
        className='space-y-4 flex flex-col w-full'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อผู้ใช้</FormLabel>
              <FormControl>
                <Input
                  type='text'
                  placeholder='กรอกชื่อผู้ใช้งานของคุณ'
                  {...field}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='password'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสผ่าน</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='กรอกรหัสผ่านของคุณ'
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button className='w-full' type='submit'>
          เข้าสู่ระบบ
        </Button>
      </form>
    </Form>
  )
}

export default SigninForm
