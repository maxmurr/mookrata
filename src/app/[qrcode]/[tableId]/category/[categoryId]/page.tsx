import React from 'react'
import { Icons } from '../../../../../components/icons'
import MenuCard from '../../../../../components/menu-card'
import { isValideQrCode } from '../../../../../lib/actions/qrcode'
import { notFound } from 'next/navigation'
import { getCategoryById } from '../../../../../lib/actions/category'
import Link from 'next/link'
import ProductItemDrawer from '../../../../../components/drawer/product-item-drawer'
import CartNotification from '../../../../../components/cart-notification'
import { getTableById } from '../../../../../lib/actions/table'
import { Table } from '@prisma/client'

type CategoryPageProps = {
  params: {
    qrcode: string
    tableId: string
    categoryId: string
  }
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const isValidQrCode = await isValideQrCode(
    Number(params.tableId),
    params.qrcode
  )

  if (!isValidQrCode) {
    return notFound()
  }

  const category = await getCategoryById(Number(params.categoryId))
  const table = await getTableById(Number(params.tableId))

  if (!category?.id) {
    return notFound()
  }

  return (
    <main>
      <div className='flex h-16 p-2 items-center gap-2 shrink-0 border-b'>
        <Link href={`/${params.qrcode}/${params.tableId}/table`} legacyBehavior>
          <div className='flex items-center'>
            <div className='flex p-[10px] justify-center items-center '>
              <Icons.arrow_left className='w-5 h-5' />
            </div>
            <p className='text-gray-900 text-center text-xl font-semibold'>
              {category.name}
            </p>
          </div>
        </Link>
      </div>
      <section className='container mx-auto p-4 flex-col items-start space-y-4 flex-1'>
        <div className='grid grid-cols-2 items-start gap-4 w-full'>
          {category.products.map(product => (
            <ProductItemDrawer key={product.id} product={product} isRemove>
              <MenuCard
                name={product.name}
                price={product.price}
                imageUrl={product.image}
              />
            </ProductItemDrawer>
          ))}
        </div>
      </section>
      <CartNotification
        href={`/${params.qrcode}/${params.tableId}/order`}
        table={table as unknown as Table}
      />
    </main>
  )
}

export default CategoryPage
