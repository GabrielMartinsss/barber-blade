import { Separator } from '@/components/ui/separator'
import { databasePrisma } from '@/lib/prisma'
import { Header } from './components/header'
import { MapPin, Star } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { ServicesAndInformations } from './components/services-and-informations'

export interface BarbershopDetailPageProps {
  params: {
    id?: string
  }
}

export default async function BarbershopDetailsPage({
  params: { id },
}: BarbershopDetailPageProps) {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session?.user

  if (!id) return redirect('/')

  const barbershop = await databasePrisma.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
      ratings: true,
    },
  })

  if (!barbershop) return redirect('/')

  const barbershopRating =
    barbershop.ratings.length > 0
      ? barbershop.ratings.reduce((state, rating) => {
          return state + rating.value
        }, 0) / barbershop.ratings.length
      : 1

  return (
    <main className="mb-10 flex flex-col gap-6">
      <Header barbershop={barbershop} />

      <section className="-mt-3 px-5">
        <h1 className="mb-3 text-xl font-bold dark:text-zinc-50">
          {barbershop.name}
        </h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPin size={14} className="text-primary-500" />
          <span className="text-sm dark:text-zinc-300">
            {barbershop.address}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Star size={14} className="text-primary-500" />
          <span className="text-sm dark:text-zinc-300">
            {barbershopRating.toFixed(1)} &#40;{barbershop.ratings.length}{' '}
            {barbershop.ratings.length > 1 ? 'avaliações' : 'avaliação'}&#41;
          </span>
        </div>
      </section>

      <Separator />

      <ServicesAndInformations
        isAuthenticated={isAuthenticated}
        barbershop={barbershop}
      />
    </main>
  )
}
