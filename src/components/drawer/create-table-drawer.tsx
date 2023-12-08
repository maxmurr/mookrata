import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import CreateTableForm from '../form/create-table-form'

type CreateTableDrawerProps = {
  children: React.ReactNode
}

const CreateTableDrawer = ({ children }: CreateTableDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <CreateTableForm />
      </DrawerContent>
    </Drawer>
  )
}

export default CreateTableDrawer
