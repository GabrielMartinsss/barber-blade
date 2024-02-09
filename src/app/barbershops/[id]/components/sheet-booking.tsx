'use client'

import { ScrollBar, ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { ptBR } from 'date-fns/locale'

import { generateDayTimeList } from '@/utils/generate-day-time-list'
import { useMemo, useState } from 'react'
import { signIn } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'

import { ServiceItemProps } from './service-item'
import { format } from 'date-fns'

export function SheetBooking({
  barbershop,
  service,
  isAuthenticated,
}: ServiceItemProps) {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()

  function handleSelectDateClick(date: Date | undefined) {
    setDate(date)
    setHour(undefined)
  }

  function handleHourClick(time: string) {
    setHour(time)
  }

  async function handleBookingClick() {
    if (!isAuthenticated) {
      return signIn('google')
    }
  }

  const timeList = useMemo(
    () => (date ? generateDayTimeList(date) : []),
    [date],
  )

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" onClick={handleBookingClick}>
          Reservar
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[90%] p-0 dark:text-zinc-50">
        <SheetTitle className="px-5 py-6 text-lg font-bold">
          Fazer reserva
        </SheetTitle>

        <Separator />

        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDateClick}
          className="px-5 py-6 capitalize"
          fromDate={new Date()}
          locale={ptBR}
        />

        <Separator />

        {/* TODO: only show scheduling hours if user selected a date */}
        {date && (
          <ScrollArea className="w-full">
            <div className="flex w-max gap-2 px-5 py-6">
              {timeList.map((time) => (
                <Button
                  value={hour}
                  variant={hour === time ? 'default' : 'outline'}
                  className="border border-zinc-800 dark:text-zinc-50"
                  key={time}
                  onClick={() => handleHourClick(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        <Separator />

        <Card className="mx-5 my-6">
          <CardContent className="space-y-3 p-3">
            <div className="flex items-center justify-between dark:text-zinc-50">
              <h2 className="font-bold capitalize">{service.name}</h2>
              <span className="text-sm font-bold">
                {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </span>
            </div>

            {date && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Data</span>
                <span className="text-sm text-zinc-50">
                  {format(date, "dd 'de'")}{' '}
                  <span className="capitalize">
                    {format(date, ' MMMM', { locale: ptBR })}
                  </span>
                </span>
              </div>
            )}

            {hour && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-500">Horário</span>
                <span className="text-sm text-zinc-50">{hour}</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Barbearia</span>
              <span className="text-sm text-zinc-50">{barbershop.name}</span>
            </div>
          </CardContent>
        </Card>

        <SheetFooter className="absolute bottom-6 w-full px-5">
          <Button disabled={!date || !hour}>Confirmar</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
