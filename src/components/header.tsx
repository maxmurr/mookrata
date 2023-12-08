'use client'

import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/drop-down-menu'
import { Icons } from './icons'
import { signOut } from 'next-auth/react'
import toast from 'react-hot-toast'

const Header = () => {
  return (
    <header className='flex w-full justify-between'>
      <div className='flex items-center gap-2'>
        <Image
          src='/images/logo.png'
          alt='logo'
          width={40}
          height={40}
          priority
        />
        <p className='text-lg font-semibold text-gray-900'>
          Glamorous Mookrata
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className='border'>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex gap-2 text-gray-500'
            onClick={async () => {
              await signOut({
                callbackUrl: '/dashboard/sign-in',
                redirect: true,
              })
                .then(() => {
                  toast.success('ออกจากระบบสำเร็จ')
                })
                .catch(e => {
                  toast.error('ออกจากระบบไม่สำเร็จ')
                  console.log(e)
                })
            }}
          >
            <Icons.logout className='w-5 h-5' />
            ออกจากระบบ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
