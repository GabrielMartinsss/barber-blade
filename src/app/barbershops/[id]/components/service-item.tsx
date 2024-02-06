'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Service } from '@prisma/client'
import { signIn } from 'next-auth/react'
import Image from 'next/image'

export interface ServiceItemProps {
  service: Service
  isAuthenticated: boolean
}

export function ServiceItem({
  service,
  isAuthenticated = false,
}: ServiceItemProps) {
  async function handleBookingClick() {
    if (!isAuthenticated) {
      return signIn('google')
    }

    // TODO: open modal of bookings
  }

  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative size-[6.875rem] overflow-hidden rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            sizes="6.875rem"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-sm font-bold dark:text-zinc-50">
            {service.name}
          </h2>
          <p className="flex-1 text-sm dark:text-zinc-500">
            {service.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary-500">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </span>
            <Button variant="secondary" onClick={handleBookingClick}>
              Reservar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
