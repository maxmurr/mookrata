import React from 'react'
import Link from 'next/link'
import { Table } from '@prisma/client'

type TableCardProps = {
  table: Table
}

const TableCard = ({ table }: TableCardProps) => {
  return (
    <Link
      href={`/dashboard/table/${table.id}`}
      className='flex h-[173px] p-4 flex-col justify-center items-center gap-2 flex-1 border border-gray-200 rounded-md'
    >
      <p className='text-xl text-black font-semibold'>{table.name}</p>
      <p
        className={`${
          table.status === 'available' ? 'text-green-700' : 'text-red-700'
        } text-base`}
      >
        {table.status === 'available' ? 'ว่าง' : 'ไม่ว่าง'}
      </p>
    </Link>
  )
}

export default TableCard
