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
      legacyBehavior>
      <p className='text-xl text-black font-semibold'>{table.name}</p>
      <p
        className={`${
          !table.qrCode ? 'text-green-700' : 'text-red-700'
        } text-base`}
      >
        {!table.qrCode ? 'ว่าง' : 'ไม่ว่าง'}
      </p>
    </Link>
  );
}

export default TableCard
