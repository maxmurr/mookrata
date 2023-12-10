'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { createTable } from '../../lib/actions/table'
import toast from 'react-hot-toast'

const createTableSchema = z.object({
  name: z.string().nonempty('กรุณากรอกชื่อโต๊ะ'),
})

type CreateTableInput = z.infer<typeof createTableSchema>

const CreateTableForm = () => {
  const form = useForm<CreateTableInput>({
    resolver: zodResolver(createTableSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: CreateTableInput) => {
    await createTable(data.name)
      .then(() => {
        toast.success('เพิ่มโต๊ะเรียบร้อยแล้ว')
        const escEvent = new KeyboardEvent('keydown', { key: 'Escape' })
        document.dispatchEvent(escEvent)
      })
      .catch(() => {
        toast.error('เพิ่มโต๊ะไม่สำเร็จ')
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex py-0 px-4 flex-col items-start gap-4 flex-1 pt-4'
      >
        <p className='text-gray-900 text-lg font-semibold'>เพิ่มโต๊ะ</p>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>ชื่อโต๊ะ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='กรอกชื่อโต๊ะ'
                  className='w-full'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <Button className='w-full'>เพิ่ม</Button>
      </form>
    </Form>
  )
}

export default CreateTableForm
