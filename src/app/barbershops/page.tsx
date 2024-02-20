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
  })
  return (
    <>
      <Header className="px-5" />

      <div className="px-5 py-6">
        <InputSearch defaultValues={{ search }} />
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase dark:text-zinc-500">
          Resultado para &quot;{search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  )
}
