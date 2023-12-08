'use server'

import { getServerAuthSession } from '../../server/auth'
import { db } from '../../server/db'

export const isValideQrCode = async (id: number, qrCode: string) => {
  const session = await getServerAuthSession()

  if (!session) throw new Error('Unauthorized')

  const table = await db.table.findUnique({
    where: {
      id,
    },
  })

  if (table === null) {
    return false
  }

  if (table.qrCode !== qrCode) {
    return false
  }

  return table !== null
}
