import { Barbershop } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface BookingCardProps {
  service: {
    name: string
    price: number
  }
  booking: {
    date: Date | undefined
    hour: string | undefined
  }
  barbershop: Barbershop
}

export function BookingCard({
  service,
  booking,
  barbershop,
}: BookingCardProps) {
  return (
    <div className="space-y-3 p-3">
      <div className="flex items-center justify-between dark:text-zinc-50">
        <h2 className="font-bold capitalize">{service.name}</h2>
        <span className="text-sm font-bold">
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(service.price))}
        </span>
      </div>

      {booking.date && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">Data</span>
          <span className="text-sm text-zinc-50">
            {format(booking.date, "dd 'de'")}{' '}
            <span className="capitalize">
              {format(booking.date, ' MMMM', { locale: ptBR })}
            </span>
          </span>
        </div>
      )}

      {booking.hour && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-500">Horário</span>
          <span className="text-sm text-zinc-50">{booking.hour}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">Barbearia</span>
        <span className="text-sm text-zinc-50">{barbershop.name}</span>
      </div>
    </div>
  )
}
