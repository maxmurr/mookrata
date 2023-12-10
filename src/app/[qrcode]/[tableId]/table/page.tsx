/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Icons } from '../../../../components/icons'
import MenuCard from '../../../../components/menu-card'
import CategoryCard from '../../../../components/category-card'
import { Button } from '../../../../components/ui/button'
import { isValideQrCode } from '../../../../lib/actions/qrcode'
import { notFound } from 'next/navigation'
import { getCategories } from '../../../../lib/actions/category'
import { getPromotions } from '../../../../lib/actions/promotion'
import { getTableById } from '../../../../lib/actions/table'
import CartNotification from '../../../../components/cart-notification'
import PromotionDrawer from '../../../../components/drawer/promotion-drawer'
import { Promotion } from '@prisma/client'
import { AspectRatio } from '../../../../components/ui/aspect-ratio'

type TablePageProps = {
  params: {
    qrcode: string
    tableId: string
  }
}

const TablePage = async ({ params }: TablePageProps) => {
  const isValidQrCode = await isValideQrCode(
    Number(params.tableId),
    params.qrcode
  )

  if (!isValidQrCode) {
    return notFound()
  }

  const categories = await getCategories()
  const promotions = await getPromotions()
  const table = await getTableById(Number(params.tableId))

  if (!table?.id) {
    return notFound()
  }

  return (
    <main>
      <Image
        src='/images/banner.png'
        alt='banner'
        width={0}
        height={0}
        sizes='100vw'
        className='w-full h-auto'
      />
      <div className='bg-[#F2E8C6] rounded-r-full shadow-xl w-24 h-20 flex items-center justify-center absolute top-4'>
        <Image
          src='/images/logo.png'
          alt='logo'
          width={0}
          height={0}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          className='w-full h-auto'
        />
      </div>
      <p className='text-xl font-semibold text-white absolute top-28 pl-4'>
        {table.name}
      </p>
      {!!promotions.length && (
        <section className='container mx-auto p-4 flex-col items-start space-y-4 grow'>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-semibold text-gray-900'>เมนูแนะนำ</p>
            <Link
              href={`/${params.qrcode}/${params.tableId}/promotion`}
              legacyBehavior
            >
              <div className='text-gray-600 flex items-center gap-2'>
                ดูทั้งหมด <Icons.arrow_right className='w-5 h-5' />
              </div>
            </Link>
          </div>
          <div className='flex flex-row gap-4 pb-4 items-start overflow-x-auto overflow-y-hidden -mx-4 px-4 scroll-smooth snap-x'>
            {promotions.map(promotion => (
              <PromotionDrawer
                key={promotion.id}
                promotion={promotion as unknown as Promotion}
              >
                <MenuCard
                  name={promotion.name}
                  price={promotion.price}
                  imageUrl={promotion.image}
                />
              </PromotionDrawer>
            ))}
          </div>
        </section>
      )}
      <section className='container mx-auto p-4 flex-col items-start space-y-4 flex-1'>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-semibold text-gray-900'>หมวดหมู่</p>
        </div>
        <div className='grid grid-cols-2 items-start gap-4 w-full'>
          {categories.map(category => (
            <Link
              href={`/${params.qrcode}/${params.tableId}/category/${category.id}`}
              key={category.id}
              legacyBehavior
            >
              <CategoryCard name={category.name} imageUrl={category.image} />
            </Link>
          ))}
        </div>
      </section>
      <CartNotification
        href={`/${params.qrcode}/${params.tableId}/order`}
        table={table}
      />
    </main>
  )
}

export default TablePage
