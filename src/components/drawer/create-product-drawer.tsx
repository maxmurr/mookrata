import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import CreateProductForm from '../form/create-product-form'

type CreateProductDrawerProps = {
  children: React.ReactNode
  categoryId: number
}

const CreateProductDrawer = ({
  children,
  categoryId,
}: CreateProductDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <CreateProductForm categoryId={categoryId} />
      </DrawerContent>
    </Drawer>
  )
}

export default CreateProductDrawer
