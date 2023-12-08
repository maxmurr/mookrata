import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from '../../../components/ui/button'
import { Icons } from '../../../components/icons'
import Header from '../../../components/header'
import { getTables } from '../../../lib/actions/table'
import TableCard from '../../../components/table-card'
import TableDrawer from '../../../components/drawer/create-table-drawer'

const TablePage = async () => {
  const tables = await getTables()
  return (
    <main>
      <div className='flex py-0 px-4 flex-col items-start gap-2 border-b'>
        <div className='w-full mt-2'>
          <Header />
        </div>
        <nav className='flex items-start gap-3'>
          <Link
            href={'/dashboard/table'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-2 pl-1 border-b-2 border-brand'
          >
            <p className='text-sm font-semibold text-brand'>จัดการโต๊ะ</p>
          </Link>
          <Link
            href={'/dashboard/promotion'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'
          >
            <p className='text-sm font-semibold text-gray-500'>
              จัดการโปรโมชั่น
            </p>
          </Link>
          <Link
            href={'/dashboard/menu'}
            className='flex h-8 justify-center items-center gap-2 pt-0 pr-1 pb-3 pl-1'
          >
            <p className='text-sm font-semibold text-gray-500'>จัดการเมนู</p>
          </Link>
        </nav>
      </div>
      <section className='flex p-4 h-screen flex-col items-start gap-4 flex-1'>
        <div className='flex items-start justify-between w-full'>
          <p className='text-lg font-semibold'>โต๊ะทั้งหมด</p>
          <TableDrawer>
            <Button className='text-white py-[10px] px-[14px] gap-2 items-center flex justify-center'>
              <Icons.plus className='text-white fill-white w-5 h-5' />
              <p>เพิ่มโต๊ะ</p>
            </Button>
          </TableDrawer>
        </div>
        {tables.length > 0 ? (
          <div className='grid grid-cols-2 w-full gap-4'>
            {tables.map(table => (
              <TableCard
                key={table.id}
                table={table}
              />
            ))}
          </div>
        ) : (
          <div className='m-auto'>
            <p className='text-base font-medium text-gray-500'>ยังไม่มีโต๊ะ</p>
          </div>
        )}
      </section>
    </main>
  )
}

export default TablePage
