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
import { createProduct, updateProduct } from '../../lib/actions/product'
import toast from 'react-hot-toast'
import { Product } from '@prisma/client'
import DeleteProductDrawer from '../drawer/delete-product-drawer'
import { useUploadThing } from '../../lib/uploadthing'

const editProductSchema = z.object({
  name: z.string().nonempty('กรุณากรอกชื่อสินค้า'),
  price: z.preprocess(x => Number(x), z.number()),
  description: z.string().optional(),
  image: z.string().optional(),
})

type EditProductInput = z.infer<typeof editProductSchema>

type EditProductFormProps = {
  product: Product
  categoryId: number
}

const EditProductForm = ({ product, categoryId }: EditProductFormProps) => {
  const [files, setFiles] = useState<File[]>([])

  const form = useForm<EditProductInput>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: product.name ?? '',
      price: product.price ?? undefined,
      description: product.description ?? undefined,
    },
  })

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: () => {
      toast.success('อัปโหลดรูปปกหมวดหมู่เรียบร้อยแล้ว')
    },
    onUploadError: e => {
      toast.error('อัปโหลดรูปปกหมวดหมู่ไม่สำเร็จ')
      console.log('Error: ', e)
    },
  })

  const onSubmit = async (data: EditProductInput) => {
    if (!!files.length) {
      console.log(files)
      await startUpload(files).then(res => {
        console.log(res)
        if (!res) return
        form.setValue('image', res[0].url)
      })
    }

    await updateProduct(
      data.name,
      Number(data.price),
      data.description,
      data.image,
      product.id,
      categoryId
    )
      .then(() => {
        toast.success('บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว')
        const escEvent = new KeyboardEvent('keydown', {
          key: 'Escape',
        })
        document.dispatchEvent(escEvent)
      })
      .catch(e => {
        toast.error('บันทึกการเปลี่ยนแปลงไม่สำเร็จ')
        console.log(e)
      })
  }

  useEffect(() => {
    if (!!files.length) {
      toast.success('เพิ่มรูปปกหมวดหมู่เรียบร้อยแล้ว')
      return
    }
  }, [files])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex py-0 px-4 flex-col items-start gap-4 flex-1 pt-4'
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
              <div className='flex flex-col items-center gap-[.75rem] self-stretch'>
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
                        setFiles(e.target.files as unknown as File[])
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
          <DeleteProductDrawer product={product} categoryId={categoryId}>
            <Button
              className='w-full text-red-700'
              variant={'outline'}
              type='button'
            >
              ลบ
            </Button>
          </DeleteProductDrawer>
          <Button className='w-full' disabled={isUploading} type='submit'>
            บันทึก
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditProductForm
