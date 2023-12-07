'use client'

import { useEffect } from 'react'
import { Icons } from '../components/icons'
import { Button } from '../components/ui/button'
import Image from 'next/image'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div className='flex w-[30rem] flex-col items-center justify-center gap-6 bg-card-white p-6'>
        <Image src='/images/error.png' width={360} height={360} alt={'error'} />
        <div className='flex flex-col items-center justify-center gap-4 self-stretch'>
          <p className='text-lg font-semibold'>
            เกิดข้อผิดพลาด กรุณาติดต่อพนักงาน
          </p>
        </div>
        <Button variant={'outline'} size='lg' onClick={() => reset()}>
          <div className='flex gap-2'>
            <Icons.arrow_path className='w-5 h-5' />
            Try again
          </div>
        </Button>
      </div>
    </div>
  )
}
