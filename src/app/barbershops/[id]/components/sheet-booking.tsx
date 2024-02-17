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
import { useEffect, useMemo, useState } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { Card, CardContent } from '@/components/ui/card'

import { ServiceItemProps } from './service-item'
import { format, setHours, setMinutes } from 'date-fns'
import { saveBooking } from '../actions/save-booking'
import { CheckCircle2, Loader2 } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { Booking } from '@prisma/client'
import { getBookingsHours } from '../actions/get-bookings-hours'

interface DataUser {
  id: string
  name: string
  email: string
  image: string
}

export function SheetBooking({
  barbershop,
  service,
  isAuthenticated,
}: ServiceItemProps) {
  const { data } = useSession()
  const router = useRouter()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [bookingsHours, setBookingsHours] = useState<Booking[]>([])
  const [isSubmitLoding, setIsSubmitLoding] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [isMadeBooking, setIsMadeBooking] = useState(false)

  useEffect(() => {
    async function refreshBookingsHours() {
      if (!date) return

      const _bookingsHours = await getBookingsHours(barbershop.id, date)
      setBookingsHours(_bookingsHours)
    }

    refreshBookingsHours()
  }, [date, barbershop.id])

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

  async function handleBookingSubmit() {
    try {
      setIsSubmitLoding(true)
      if (!hour || !date || !data?.user) return

      const dateHour = Number(hour.split(':')[0])
      const dateMinutes = Number(hour.split(':')[1])
      const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        userId: (data.user as DataUser).id,
        date: newDate,
      })

      setIsMadeBooking(true)
      setHour(undefined)
      setDate(undefined)
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoding(false)
    }
  }

  const timeList = useMemo(() => {
    if (!date) return []

    return generateDayTimeList(date).filter((time) => {
      const timeHours = Number(time.split(':')[0])
      const timeMinutes = Number(time.split(':')[1])

      const bookings = bookingsHours.find((booking) => {
        const bookingHours = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHours === timeHours && bookingMinutes === timeMinutes
      })

      if (!bookings) return true
      return false
    })
  }, [date, bookingsHours])

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
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
          <AlertDialog open={isMadeBooking}>
            <AlertDialogTrigger asChild>
              <Button
                disabled={!date || !hour || isSubmitLoding}
                onClick={handleBookingSubmit}
                className="dark:text-zinc-50"
              >
                {isSubmitLoding && (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                )}
                Confirmar
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-60">
              <AlertDialogHeader className="dark:text-zinc-50">
                <AlertDialogTitle className="flex flex-col items-center">
                  <CheckCircle2
                    fill="#F57605"
                    size={72}
                    className="dark:text-zinc-900"
                  />
                  Reserva realizada!
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Sua reserva foi agendada com sucesso.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <div className="flex flex-col items-center gap-3">
                  <AlertDialogCancel
                    onClick={() => {
                      setIsMadeBooking(false)
                      setIsSheetOpen(false)
                      router.refresh()
                    }}
                    className="w-full dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                  >
                    OK
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      router.push('/bookings')
                      router.refresh()
                    }}
                    className="w-full dark:text-zinc-50"
                  >
                    Ver reserva
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
