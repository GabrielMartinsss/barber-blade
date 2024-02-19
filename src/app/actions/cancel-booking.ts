'use server'

import { databasePrisma } from '@/lib/prisma'

export async function cancelBooking(bookingId: string) {
  return await databasePrisma.booking.delete({
    where: {
      id: bookingId,
    },
  })
}
