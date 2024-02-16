import { Header } from '@/components/header'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { databasePrisma } from '@/lib/prisma'
import { BookingItem } from '@/components/booking-item'
import { isFuture, isPast } from 'date-fns'
import { Separator } from '@/components/ui/separator'

interface DataUser {
  id: string
  name: string
  email: string
  image: string
}

export default async function BookingsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return redirect('/')

  const bookings = await databasePrisma.booking.findMany({
    where: {
      userId: (session.user as DataUser).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  })

  const confirmedBookings = bookings
    .filter((booking) => isFuture(booking.date))
    .sort((a, b) => Number(a.date) - Number(b.date))
  const finishedBookings = bookings
    .filter((booking) => isPast(booking.date))
    .sort((a, b) => Number(b.date) - Number(a.date))

  const isAnyBooking =
    confirmedBookings.length < 1 && finishedBookings.length < 1
  return (
    <div className="mb-10 space-y-6 px-5">
      <Header />

      <h1 className="text-xl font-bold dark:text-zinc-50">Agendamentos</h1>

      {isAnyBooking && (
        <span className="mt-3 block text-sm dark:text-zinc-400">
          Você não possui agendamento!
        </span>
      )}

      {confirmedBookings.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs uppercase dark:text-zinc-500">Confirmados</h2>
          {confirmedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}

      <Separator className={isAnyBooking ? 'hidden' : ''} />

      {finishedBookings.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs uppercase dark:text-zinc-500">Finalizados</h2>
          {finishedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}
