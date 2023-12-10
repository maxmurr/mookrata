import React from 'react'
import { Icons } from '../../../../components/icons'
import MenuCard from '../../../../components/menu-card'
import { isValideQrCode } from '../../../../lib/actions/qrcode'
import { notFound } from 'next/navigation'
import { getPromotions } from '../../../../lib/actions/promotion'
import Link from 'next/link'
import PromotionDrawer from '../../../../components/drawer/promotion-drawer'
import CartNotification from '../../../../components/cart-notification'
import { getTableById } from '../../../../lib/actions/table'
import { Table } from '@prisma/client'

type PromotionPageProps = {
  params: {
    qrcode: string
    tableId: string
  }
}

const PromotionPage = async ({ params }: PromotionPageProps) => {
  const isValidQrCode = await isValideQrCode(
    Number(params.tableId),
    params.qrcode
  )

  if (!isValidQrCode) {
    return notFound()
  }

  const promotions = await getPromotions()
  const table = await getTableById(Number(params.tableId))

  return (
    <main>
      <div className='flex h-16 p-2 items-center gap-2 shrink-0 border-b'>
        <Link
          href={`/${params.qrcode}/${params.tableId}/table`}
          className='flex items-center'
          legacyBehavior>
          <div className='flex p-[10px] justify-center items-center '>
            <Icons.arrow_left className='w-5 h-5' />
          </div>
          <p className='text-gray-900 text-center text-xl font-semibold'>
            โปรโมชัน
          </p>
        </Link>
      </div>
      <section className='container mx-auto p-4 flex-col items-start space-y-4 flex-1'>
        <div className='grid grid-cols-2 items-start gap-4 w-full'>
          {promotions.map(promotion => (
            <PromotionDrawer key={promotion.id} promotion={promotion}>
              <MenuCard
                name={promotion.name}
                price={promotion.price}
                width={173}
              />
            </PromotionDrawer>
          ))}
        </div>
      </section>
      <CartNotification
        href={`/${params.qrcode}/${params.tableId}/order`}
        table={table as unknown as Table}
      />
    </main>
  );
}

export default PromotionPage
