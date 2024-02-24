'use server'

import { databasePrisma } from '@/lib/prisma'

interface CreateRatingProps {
  ratingValue: number
  barbershopId: string
}

export async function createRating({
  ratingValue,
  barbershopId,
}: CreateRatingProps) {
  return await databasePrisma.rating.create({
    data: {
      value: ratingValue,
      barbershopId,
    },
  })
}
