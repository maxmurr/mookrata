/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Icons } from '../../../components/icons'
import MenuCard from '../../../components/menu-card'

type ProductPageProps = {
  params: {
    id: string
  }
}

const ProductPage = ({ params }: ProductPageProps) => {
  return (
    <main>
      <div className='flex h-16 p-2 items-center gap-2 shrink-0 border-b'>
        <div className='flex p-[10px] justify-center items-center '>
          <Icons.arrow_left className='w-5 h-5' />
        </div>
        <p className='text-gray-900 text-center text-xl font-semibold'>
          เนื้อหมู
        </p>
      </div>
      <section className='container mx-auto p-4 flex-col items-start space-y-4 flex-1'>
        <div className='grid grid-cols-2 items-start gap-4 w-full'>
          <MenuCard name='Glamorous Set A' price={300} width={173} />
          <MenuCard name='Glamorous Set B' price={400} width={173} />
          <MenuCard name='Glamorous Set C' price={500} width={173} />
        </div>
      </section>
    </main>
  )
}

export default ProductPage
