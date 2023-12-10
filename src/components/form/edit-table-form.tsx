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
import { createTable, updateTable } from '../../lib/actions/table'
import toast from 'react-hot-toast'
import { Table } from '@prisma/client'

const editTableSchema = z.object({
  name: z.string().nonempty('กรุณากรอกชื่อโต๊ะ'),
})

type EditTableInput = z.infer<typeof editTableSchema>

type EditTableFormProps = {
  table: Table
}

const EditTableForm = ({ table }: EditTableFormProps) => {
  const form = useForm<EditTableInput>({
    resolver: zodResolver(editTableSchema),
    defaultValues: {
      name: table?.name ?? '',
    },
  })

  const onSubmit = async (data: EditTableInput) => {
    await updateTable(table.id, data.name)
      .then(() => {
        toast.success('บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว')
        const escEvent = new KeyboardEvent('keydown', { key: 'Escape' })
        document.dispatchEvent(escEvent)
      })
      .catch(() => {
        toast.error('บันทึกการเปลี่ยนแปลงไม่สำเร็จ')
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex py-0 pt-4 px-4 flex-col items-start gap-4 flex-1'
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
        <Button className='w-full'>บันทึก</Button>
      </form>
    </Form>
  )
}

export default EditTableForm
