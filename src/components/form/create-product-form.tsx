'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
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
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Icons } from '../icons'
import { createProduct } from '../../lib/actions/product'
import toast from 'react-hot-toast'
import { useEdgeStore } from '@/lib/edgestore'

const createProductSchema = z.object({
  name: z.string().nonempty('กรุณากรอกชื่อสินค้า'),
  price: z.preprocess(x => Number(x), z.number()),
  description: z.string().optional(),
})

type CreateProductInput = z.infer<typeof createProductSchema>

type CreateProductFormProps = {
  categoryId: number
}

const CreateProductForm = ({ categoryId }: CreateProductFormProps) => {
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState(false)
  const { edgestore } = useEdgeStore()

  const form = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (data: CreateProductInput) => {
    setIsLoading(true)
    if (file) {
      await edgestore.publicFiles
        .upload({
          file,
          options: {
            temporary: true,
          },
        })
        .then(async res => {
          await createProduct(
            data.name,
            Number(data.price),
            data.description,
            categoryId,
            res.url
          )
            .then(() => {
              setIsLoading(false)
              toast.success('เพิ่มรายการอาหารเรียบร้อยแล้ว')
              const escEvent = new KeyboardEvent('keydown', {
                key: 'Escape',
              })
              document.dispatchEvent(escEvent)
            })
            .catch(e => {
              toast.error('เพิ่มรายการอาหารไม่สำเร็จ')
              console.log(e)
            })
        })
    } else {
      await createProduct(
        data.name,
        Number(data.price),
        data.description,
        categoryId
      )
        .then(() => {
          setIsLoading(false)
          toast.success('เพิ่มรายการอาหารเรียบร้อยแล้ว')
          const escEvent = new KeyboardEvent('keydown', {
            key: 'Escape',
          })
          document.dispatchEvent(escEvent)
        })
        .catch(e => {
          toast.error('เพิ่มรายการอาหารไม่สำเร็จ')
          console.log(e)
        })
    }
  }

  useEffect(() => {
    if (file) {
      toast.success('เพิ่มรูปปกหมวดหมู่เรียบร้อยแล้ว')
      return
    }
  }, [file])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex py-0 px-4 flex-col items-start gap-4 flex-1 w-full pt-4'
      >
        <p className='text-gray-900 text-lg font-semibold'>เพิ่มรายการอาหาร</p>
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>ชื่ออาหาร</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='กรอกชื่ออาหาร'
                  className='w-full'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.name?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='price'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>ราคา</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type='number'
                  placeholder='กรอกราคา'
                  className='w-full'
                />
              </FormControl>
              <FormMessage>{form.formState.errors.price?.message}</FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name='description'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>คำอธิบาย (ไม่บังคับ)</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder='กรอกคำอธิบาย'
                  className='w-full h-32'
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.description?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormItem className='w-full'>
          <FormLabel>อัปโหลดรูปปก</FormLabel>
          <FormControl>
            <label
              htmlFor='fileUpload'
              className='flex flex-col items-center gap-1 self-stretch rounded-[.75rem] border bg-white px-6 py-4'
            >
              <div className='flex flex-col items-center gap-[.5rem] self-stretch'>
                <div className='shadow-xs flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[.5rem] border bg-white p-[.625rem]'>
                  <Icons.upload />
                </div>
                <div className='flex flex-col items-center gap-1 self-stretch'>
                  <div className='flex items-center justify-center gap-1 self-stretch'>
                    <Button variant={'link'} className='p-0' type='button'>
                      Click to upload
                    </Button>
                    <Input
                      type='file'
                      hidden
                      id='fileUpload'
                      style={{ display: 'none' }}
                      onChange={e => {
                        setFile(e.target.files?.[0] as File)
                      }}
                    />
                  </div>
                  <p className='text-xs text-gray-600'>JPG, PNG</p>
                </div>
              </div>
            </label>
          </FormControl>
        </FormItem>
        <div className='flex w-full p-4 bg-background items-center justify-between gap-4 border-t mt-4 fixed bottom-0 right-0'>
          <Button className='w-full' type='submit' disabled={isLoading}>
            เพิ่ม
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CreateProductForm
