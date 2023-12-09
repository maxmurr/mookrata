'use client'

import Image from 'next/image'
import { Button } from '../components/ui/button'
import { Icons } from '../components/icons'
import { useRouter } from 'next/navigation'

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <div className='flex w-[30rem] flex-col items-center justify-center gap-6 bg-card-white p-6'>
        <Image src='/images/404.png' width={360} height={360} alt={'error'} />
        <div className='flex flex-col items-center justify-center gap-4 self-stretch'>
          <p className='text-lg font-semibold'>
            เกิดข้อผิดพลาด กรุณาติดต่อพนักงาน
          </p>
        </div>
        <Button
          variant={'outline'}
          size='lg'
          onClick={() => router.push('/dashboard/table')}
        >
          <div className='flex gap-2'>
            <Icons.arrow_left className='w-5 h-5' />
            กลับหน้าหลัก
          </div>
        </Button>
      </div>
    </div>
  )
}

export default NotFoundPage
