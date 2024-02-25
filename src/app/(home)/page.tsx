import { endOfDay, format, isFuture, startOfDay } from 'date-fns'
import { Header } from '@/components/header'
import { ptBR } from 'date-fns/locale'
import { InputSearch } from '../../components/input-search'
import { BookingItem } from '@/components/booking-item'
import { BarbershopItem } from '@/components/barbershop-item'
import { databasePrisma } from '@/lib/prisma'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

interface DataUser {
  id: string
  name: string
  email: string
  image: string
}

export default async function Home() {
  const session = await getServerSession(authOptions)
  const [barbershops, bookings] = await Promise.all([
    databasePrisma.barbershop.findMany({
      include: { ratings: true },
    }),
    session?.user
      ? await databasePrisma.booking.findMany({
          where: {
            userId: (session.user as DataUser).id,
            date: {
              lte: endOfDay(new Date()),
              gte: startOfDay(new Date()),
            },
          },
          include: {
            service: true,
            barbershop: true,
          },
        })
      : Promise.resolve([]),
  ])

  const bookingsFiltered = bookings
    .filter((booking) => isFuture(booking.date))
    .sort((a, b) => Number(a.date) - Number(b.date))

  const recommendedBarbershops = barbershops.filter(
    (item) =>
      item.ratings.reduce((acc, curret) => acc + curret.value, 0) /
        item.ratings.length >=
      4,
  )

  return (
    <div className="mb-10 space-y-6">
      <Header className="px-5" />

      <div className="px-5">
        <h2 className="text-xl dark:text-zinc-50">
          Olá,{' '}
          <span className="font-bold">
            {session?.user
              ? session.user.name?.split(' ')[0]
              : 'faça seu login'}
            !
          </span>
        </h2>
        <span className="text-sm capitalize dark:text-zinc-300">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </span>
      </div>

      <div className="px-5">
        <InputSearch />
      </div>

      {bookingsFiltered.length > 0 && (
        <div className="space-y-3 px-5">
          <p className="text-xs font-bold uppercase dark:text-zinc-500">
            Agendamentos de hoje
          </p>
          {bookingsFiltered.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      )}

      <div className="space-y-3">
        <p className="px-5 text-xs font-bold uppercase dark:text-zinc-500">
          Recomendados
        </p>

        <ScrollArea className="w-full pl-5">
          <div className="flex w-max gap-4 pb-4">
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="space-y-3">
        <p className="px-5 text-xs font-bold uppercase dark:text-zinc-500">
          Populares
        </p>

        <ScrollArea className="w-full pl-5">
          <div className="flex w-max gap-4 pb-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  )
}
