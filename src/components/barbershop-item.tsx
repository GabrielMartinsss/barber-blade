'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Prisma } from '@prisma/client'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface BarbershopItemProps {
  barbershop: Prisma.BarbershopGetPayload<{
    include: { ratings: true }
  }>
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  const router = useRouter()

  function handleBookingClick() {
    router.push(`/barbershops/${barbershop.id}`)
  }

  const barbershopRating =
    barbershop.ratings.length > 0
      ? barbershop.ratings.reduce((state, rating) => {
          return state + rating.value
        }, 0) / barbershop.ratings.length
      : 1

  return (
    <Card className="w-full overflow-hidden rounded-b-2xl rounded-t-3xl last:mr-5">
      <CardContent className="p-1">
        <div className="relative h-[10rem] w-full overflow-hidden rounded-2xl">
          <Badge
            variant="secondary"
            className="absolute left-1 top-1 z-50 flex items-center gap-1 dark:border-transparent dark:bg-opacity-75"
          >
            <Star className="size-3 fill-primary-500 text-primary-500" />
            <span className="dark:text-zinc-50">
              {barbershopRating.toFixed(1)}
            </span>
          </Badge>
          <Image
            src={barbershop.imageUrl}
            alt={`Barbershop: ${barbershop.name}`}
            fill
            style={{
              objectFit: 'cover',
            }}
            sizes="100vw"
          />
        </div>

        <div className="p-2 pt-1">
          <h2 className="overflow-hidden text-ellipsis text-nowrap font-bold dark:text-zinc-50">
            {barbershop.name}
          </h2>
          <p className="mb-3 overflow-hidden text-ellipsis text-nowrap text-xs text-zinc-500">
            {barbershop.address}
          </p>

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleBookingClick}
          >
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
