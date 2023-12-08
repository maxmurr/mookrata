import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { Product } from '@prisma/client'
import EditProductForm from '../form/edit-product-form'

type EditProductDrawerProps = {
  children: React.ReactNode
  product: Product
  categoryId: number
}

const EditProductDrawer = ({
  children,
  product,
  categoryId,
}: EditProductDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <EditProductForm product={product} categoryId={categoryId} />
      </DrawerContent>
    </Drawer>
  )
}

export default EditProductDrawer
