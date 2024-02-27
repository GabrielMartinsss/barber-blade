import { Header } from '@/components/header'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { databasePrisma } from '@/lib/prisma'
import { BookingItem } from '@/components/booking-item'
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

  const [confirmedBookings, finishedBookings] = await Promise.all([
    databasePrisma.booking.findMany({
      where: {
        userId: (session.user as DataUser).id,
        date: { gt: new Date() },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
    databasePrisma.booking.findMany({
      where: {
        userId: (session.user as DataUser).id,
        date: { lt: new Date() },
      },
      include: {
        service: true,
        barbershop: true,
      },
    }),
  ])

  const isAnyBooking =
    confirmedBookings.length < 1 && finishedBookings.length < 1
  return (
    <>
      <Header variant="withSearch" />

      <div className="my-10 space-y-6 px-5 lg:mx-auto lg:px-20 2xl:max-w-[1440px] 2xl:px-32">
        <h1 className="text-xl font-bold dark:text-zinc-50">Agendamentos</h1>

        {isAnyBooking && (
          <span className="mt-3 block text-sm dark:text-zinc-400">
            Você não possui agendamento!
          </span>
        )}

        {confirmedBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs uppercase dark:text-zinc-500">
              Confirmados
            </h2>
            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0 xl:grid-cols-3">
              {confirmedBookings
                .sort((a, b) => Number(a.date) - Number(b.date))
                .map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
            </div>
          </div>
        )}

        <Separator className={isAnyBooking ? 'hidden' : ''} />

        {finishedBookings.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs uppercase dark:text-zinc-500">
              Finalizados
            </h2>

            <div className="space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0 xl:grid-cols-3">
              {finishedBookings
                .sort((a, b) => Number(b.date) - Number(a.date))
                .map((booking) => (
                  <BookingItem key={booking.id} booking={booking} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
