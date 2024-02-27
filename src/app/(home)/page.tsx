import { endOfDay, format, isFuture, startOfDay } from 'date-fns'
import { Header } from '@/components/header'
import { ptBR } from 'date-fns/locale'
import { InputSearch } from '../../components/input-search'
import { BookingItem } from '@/components/booking-item'
import { databasePrisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Image from 'next/image'
import { CarouselBarbershop } from '@/components/carousel-barbershop'

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

  const popularBarbershops = barbershops.slice().sort(() => Math.random() - 0.5)

  return (
    <div className="mb-10 space-y-6 lg:mx-auto">
      <Header className="pl-5" />

      <div className="relative lg:bg-opacity-5 lg:py-16">
        <Image
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="foto de um homem fazendo a barba de outro"
          fill
          className="z-0 hidden object-cover object-top opacity-15 lg:block"
          sizes="100vw"
        />
        <div className="xl:32 lg:mx-auto lg:grid lg:grid-cols-home lg:gap-6 lg:px-20 xl:gap-12 2xl:max-w-[1440px] 2xl:gap-16 2xl:px-32">
          <div className="z-10 flex w-full flex-col gap-6">
            <div className="px-5 2xl:max-w-[1440px]">
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
                <p className="text-xs font-bold uppercase dark:text-zinc-500 lg:hidden">
                  Agendamentos de hoje
                </p>
                <p className="hidden text-xs font-bold uppercase dark:text-zinc-500 lg:block">
                  Próximo agendamento
                </p>

                <div className="hidden lg:block">
                  <BookingItem
                    key={bookingsFiltered[0].id}
                    booking={bookingsFiltered[0]}
                  />
                </div>

                <div className="space-y-3 lg:hidden">
                  {bookingsFiltered.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden overflow-hidden px-6 lg:flex lg:h-80 lg:flex-col">
            <div className="space-y-3">
              <p className="px-5 text-xs font-bold uppercase dark:text-zinc-500">
                Recomendados
              </p>

              <CarouselBarbershop barbershops={recommendedBarbershops} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 lg:hidden">
        <p className="px-5 text-xs font-bold uppercase dark:text-zinc-500">
          Recomendados
        </p>

        <CarouselBarbershop
          barbershops={recommendedBarbershops}
          appearance="secondary"
        />
      </div>

      <div className="space-y-3 lg:mx-auto lg:px-20 2xl:max-w-[1440px] 2xl:px-32">
        <p className="px-5 text-xs font-bold uppercase dark:text-zinc-500">
          Populares
        </p>

        <CarouselBarbershop
          barbershops={popularBarbershops}
          appearance="secondary"
        />
      </div>

      <div className="hidden space-y-3 lg:mx-auto lg:block lg:px-20 2xl:max-w-[1440px] 2xl:px-32">
        <p className="px-5 text-xs font-bold uppercase dark:text-zinc-500">
          Mais visitados
        </p>

        <CarouselBarbershop barbershops={barbershops} appearance="secondary" />
      </div>
    </div>
  )
}
