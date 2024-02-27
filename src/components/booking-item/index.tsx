'use client'

import { Prisma } from '@prisma/client'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { format, isFuture } from 'date-fns'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import { Separator } from '../ui/separator'
import { ServiceCard } from '@/app/barbershops/[id]/components/service-card'
import { Button } from '../ui/button'

import { useState } from 'react'
import { CancelBookingAlertDialog } from './cancel-booking-alert-dialog'
import { BookingCard } from './booking-card'
import { BarbershopPhone } from '../barbershop-phone'
import { RatingBarbershop } from './rating-barbershop'
import { BarbershopInfoCardImage } from '../barbershop-info-card-image'

export interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      {/* trigger  */}
      <BookingCard booking={booking} setIsSheetOpen={setIsSheetOpen} />

      <SheetContent className="w-[90%] p-0 dark:text-zinc-50">
        <SheetHeader className="px-5 py-6">
          <SheetTitle className="text-left">Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 px-5">
          <Separator />

          <BarbershopInfoCardImage barbershop={booking.barbershop} />

          <div className="space-y-3">
            {isFuture(booking.date) ? (
              <Badge className="w-fit">Confirmado</Badge>
            ) : (
              <Badge variant="secondary" className="w-fit">
                Finalizado
              </Badge>
            )}

            <Card>
              <CardContent>
                <ServiceCard
                  service={{
                    name: booking.service.name,
                    price: Number(booking.service.price),
                  }}
                  booking={{
                    date: booking.date,
                    hour: format(booking.date, 'HH:mm'),
                  }}
                  barbershop={booking.barbershop}
                />
              </CardContent>
            </Card>
            <div className="py-3">
              <BarbershopPhone phone={booking.barbershop.telephone} />
            </div>
          </div>
        </div>

        <SheetFooter className="absolute bottom-6 flex w-full flex-row gap-3 px-5">
          <SheetClose asChild>
            <Button variant="secondary" className="w-full">
              Voltar
            </Button>
          </SheetClose>

          {isFuture(booking.date) ? (
            <CancelBookingAlertDialog booking={booking} />
          ) : (
            <RatingBarbershop barbershop={booking.barbershop} />
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
