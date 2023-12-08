import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import EditTableForm from '../form/edit-table-form'

type EditTableDrawerProps = {
  tableId: number
  children: React.ReactNode
}

const EditTableDrawer = ({ children, tableId }: EditTableDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <EditTableForm tableId={tableId} />
      </DrawerContent>
    </Drawer>
  )
}

export default EditTableDrawer
