import { BarbershopItem } from '@/components/barbershop-item'
import { Header } from '@/components/header'
import { InputSearch } from '@/components/input-search'
import { databasePrisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export interface BarbershopPageProps {
  searchParams: {
    search?: string
  }
}

export default async function BarbershopPage({
  searchParams: { search },
}: BarbershopPageProps) {
  if (!search) return redirect('/')

  const barbershops = await databasePrisma.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    include: {
      ratings: true,
    },
  })
  return (
    <div>
      <Header className="pl-5" />

      <div className="px-6 py-6 lg:mx-auto lg:px-24 2xl:max-w-[1440px] 2xl:px-32">
        <InputSearch defaultValues={{ search }} />
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase dark:text-zinc-500">
          Resultado para &quot;{search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}
