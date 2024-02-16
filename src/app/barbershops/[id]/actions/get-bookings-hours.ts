'use server'

import { databasePrisma } from '@/lib/prisma'
import { endOfDay, startOfDay } from 'date-fns'

export async function getBookingsHours(barbershopId: string, date: Date) {
  const bookingsHours = await databasePrisma.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })

  return bookingsHours
}
