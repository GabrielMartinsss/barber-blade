import { Prisma } from '@prisma/client'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true
      barbershop: true
    }
  }>
}

export function BookingItem({ booking }: BookingItemProps) {
  return (
    <Card>
      <CardContent className="flex pr-0">
        <div className="flex flex-1 flex-col gap-2 py-3">
          {isFuture(booking.date) ? (
            <Badge className="w-fit">Confirmado</Badge>
          ) : (
            <Badge variant="secondary" className="w-fit">
              Finalizado
            </Badge>
          )}
          <h2 className="mt-1 font-bold dark:text-zinc-50">
            {booking.service.name}
          </h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarFallback className="text-sm">
                {booking.barbershop.name[0]}
              </AvatarFallback>
              <AvatarImage src={booking.barbershop.imageUrl} />
            </Avatar>
            <span className="text-sm dark:text-zinc-300">
              {booking.barbershop.name}
            </span>
          </div>
        </div>

        <div className="flex min-w-[6.625rem] flex-col items-center justify-center border-l border-zinc-800 text-xs dark:text-zinc-50">
          <p className="capitalize">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <p className="text-2xl">{format(booking.date, 'dd')}</p>
          <p>{format(booking.date, 'hh:mm')}</p>
        </div>
      </CardContent>
    </Card>
  )
}
