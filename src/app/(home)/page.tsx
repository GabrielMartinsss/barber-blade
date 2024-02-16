import { format } from 'date-fns'
import { Header } from '@/components/header'
import { ptBR } from 'date-fns/locale'
import { InputSearch } from './components/input-search'
import { BookingItem } from '@/components/booking-item'
import { BarbershopItem } from './components/barbershop-item'
import { databasePrisma } from '@/lib/prisma'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export default async function Home() {
  const barbershops = await databasePrisma.barbershop.findMany()

  return (
    <div className="mb-10 space-y-6">
      <Header className="px-5" />

      <div className="px-5">
        <h2 className="text-xl dark:text-zinc-50">
          Olá, <span className="font-bold"> Faça seu login!</span>
        </h2>
        <span className="text-sm capitalize dark:text-zinc-300">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </span>
      </div>

      <InputSearch className="px-5" />

      <div className="space-y-3 px-5">
        <p className="text-xs font-bold uppercase dark:text-zinc-500">
          Agendamentos
        </p>
        {/* <BookingItem /> */}
      </div>

      <div className="space-y-3">
        <p className="px-5 text-xs font-bold uppercase dark:text-zinc-500">
          Recomendados
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
