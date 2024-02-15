'use server'

import { databasePrisma } from '@/lib/prisma'

interface SaveBookingParams {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export async function saveBooking({
  barbershopId,
  date,
  serviceId,
  userId,
}: SaveBookingParams) {
  await databasePrisma.booking.create({
    data: {
      barbershopId,
      date,
      serviceId,
      userId,
    },
  })
}
