'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Input } from '../ui/input'
import { Icons } from '../icons'
import { useUploadThing } from '../../lib/uploadthing'
import toast from 'react-hot-toast'
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '../../lib/actions/category'
import { useRouter } from 'next/navigation'
import { Category } from '@prisma/client'
import DeleteCategoryDrawer from '../drawer/delete-category-drawer'

const editCategorySchema = z.object({
  name: z.string().nonempty('กรุณากรอกชื่อหมวดหมู่'),
  image: z.string().optional(),
})

type EditCategoryInput = z.infer<typeof editCategorySchema>

type EditCategoryFormProps = {
  category: Category
}

const EditCategoryForm = ({ category }: EditCategoryFormProps) => {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])

  const form = useForm<EditCategoryInput>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: category.name,
      image: category.image ?? undefined,
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

  const onSubmit = async (data: EditCategoryInput) => {
    if (!!files.length) {
      console.log(files)
      await startUpload(files).then(res => {
        console.log(res)
        if (!res) return
        form.setValue('image', res[0].url)
      })
    }

    await updateCategory(category.id, data.name, data.image)
      .then(() => {
        toast.success('บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว')
        router.push('/dashboard/menu')
        router.refresh()
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
        className='w-full space-y-4 pt-4'
      >
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>ชื่อหมวดหมู่</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='กรอกชื่อหมวดหมู่'
                  type='text'
                  className='w-full'
                />
              </FormControl>
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
        <div className='flex w-full bg-background p-4 items-center justify-between gap-4 border-t mt-4 fixed bottom-0 right-0'>
          <DeleteCategoryDrawer category={category}>
            <Button
              className='w-full text-red-700'
              variant={'outline'}
              type='button'
            >
              ลบ
            </Button>
          </DeleteCategoryDrawer>
          <Button className='w-full' disabled={isUploading} type='submit'>
            บันทึก
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditCategoryForm
