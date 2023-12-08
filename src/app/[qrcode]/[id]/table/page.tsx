/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Icons } from '../../../../components/icons'
import MenuCard from '../../../../components/menu-card'
import CategoryCard from '../../../../components/category-card'
import ProductDrawer from '../../../../components/drawer/product-drawer'
import { Button } from '../../../../components/ui/button'

type TablePageProps = {
  params: {
    id: string
  }
}

const TablePage = ({ params }: TablePageProps) => {
  console.log(params)
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
          sizes='100vw'
          className='w-full h-auto'
        />
      </div>
      <p className='text-xl font-semibold text-white absolute top-28 pl-4'>
        โต๊ะ {params.id}
      </p>
      <section className='container mx-auto p-4 flex-col items-start space-y-4 grow'>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-semibold text-gray-900'>เมนูแนะนำ</p>
          <Link
            href={'/promotion'}
            className='text-gray-600 flex items-center gap-2'
          >
            ดูทั้งหมด <Icons.arrow_right className='w-5 h-5' />
          </Link>
        </div>
        <div className='flex flex-row gap-4 pb-4 items-start overflow-x-auto overflow-y-hidden -mx-4 px-4 scroll-smooth snap-x'>
          <ProductDrawer>
            <MenuCard name='Glamorous Set A' price={300} width={160} />
          </ProductDrawer>
          <MenuCard name='Glamorous Set B' price={400} width={160} />
          <MenuCard name='Glamorous Set C' price={500} width={160} />
        </div>
      </section>
      <section className='container mx-auto px-4 pb-4 flex-col items-start space-y-4 flex-1'>
        <div className='flex justify-between items-center'>
          <p className='text-lg font-semibold text-gray-900'>หมวดหมู่</p>
        </div>
        <div className='grid grid-cols-2 items-start gap-4 w-full'>
          <CategoryCard name='เนื้อหมู' />
          <CategoryCard name='เนื้อหมู' />
          <CategoryCard name='เนื้อหมู' />
        </div>
      </section>
      <div className='flex w-full p-4 items-center gap-4 border-t mt-4 absolute bottom-0'>
        <Button className='w-full'>ตะกร้าของคุณ (รอสั่ง 3 รายการ)</Button>
      </div>
    </main>
  )
}

export default TablePage
