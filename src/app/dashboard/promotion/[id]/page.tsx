import React from 'react'
import { getServerAuthSession } from '../../../../server/auth'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { Icons } from '../../../../components/icons'
import { Button } from '../../../../components/ui/button'
import { getPromotionById } from '../../../../lib/actions/promotion'
import EditPromotionForm from '../../../../components/form/edit-promotion-form'
import { Promotion } from '@prisma/client'
import ProductItem from '../../../../components/product-item'
import ProductItemDrawer from '../../../../components/drawer/product-item-drawer'
import { ScrollArea } from '../../../../components/ui/scroll-area'

type EditPromotionPageProps = {
  params: {
    id: string
  }
}

const EditPromotionPage = async ({ params }: EditPromotionPageProps) => {
  const session = await getServerAuthSession()

  if (!session) {
    redirect('/dashboard/sign-in')
  }

  const promotion = await getPromotionById(Number(params.id))

  if (!promotion?.id) {
    return notFound()
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center justify-between gap-2 shrink-0 border-b w-full'>
        <Link
          href={`/dashboard/promotion`}
          className='flex items-center'
          legacyBehavior>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            แก้ไขรายการโปรโมชัน
          </p>
        </Link>
      </div>
      <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
        <EditPromotionForm promotion={promotion as unknown as Promotion} />
      </section>
      <div className='flex items-start justify-between w-full px-4 py-2'>
        <p className='text-lg font-semibold'>รายการอาหาร</p>
        <Link href={`/dashboard/promotion/${promotion.id}/category`} legacyBehavior>
          <Button
            variant='outline'
            className=' py-[10px] px-[14px] gap-2 items-center flex justify-center'
          >
            <Icons.plus className=' fill-white w-5 h-5' />
            <p>เพิ่มรายการ</p>
          </Button>
        </Link>
      </div>
      {!!promotion.productCart?.productCartItems.length ? (
        <section className='flex p-4 flex-col justify-center items-start gap-4 flex-1 h-full'>
          <div className='w-full gap-4'>
            <ScrollArea className='flex flex-col gap-4 max-h-16'>
              {promotion.productCart.productCartItems.map(item => (
                <ProductItemDrawer
                  key={item.id}
                  product={item.product}
                  promotion={promotion}
                  isEdit
                >
                  <ProductItem
                    name={item.product.name}
                    quantity={item.quantity}
                    imageUrl={item.product.image}
                    isEdit
                  />
                </ProductItemDrawer>
              ))}
            </ScrollArea>
          </div>
        </section>
      ) : (
        <div className='flex p-4 m-auto flex-col justify-center items-center gap-4 flex-1 h-full'>
          <p className='text-base font-medium text-gray-500'>
            ยังไม่มีรายการอาหาร
          </p>
        </div>
      )}
    </main>
  );
}

export default EditPromotionPage
