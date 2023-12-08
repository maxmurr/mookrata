import React from 'react'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import EditTableForm from '../form/edit-table-form'
import { Table } from '@prisma/client'

type EditTableDrawerProps = {
  table: Table
  children: React.ReactNode
}

const EditTableDrawer = ({ children, table }: EditTableDrawerProps) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <EditTableForm table={table} />
      </DrawerContent>
    </Drawer>
  )
}

export default EditTableDrawer
