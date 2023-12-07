'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { Icons } from '../icons'

const Drawer = DrawerPrimitive.Root

const DrawerTrigger = DrawerPrimitive.Trigger

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-20 bg-black/60', className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[96%] flex-col rounded-t-[10px] bg-white dark:border-t',
        className
      )}
      {...props}
    >
      {children}
      <DrawerClose className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'>
        <Icons.x className='h-6 w-6' />
        <span className='sr-only'>Close</span>
      </DrawerClose>
    </DrawerPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = DrawerPrimitive.Content.displayName

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col border-b py-4 text-center', className)}
    {...props}
  />
)
DrawerHeader.displayName = 'DrawerHeader'

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold', className)}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerClose,
  DrawerTitle,
}
