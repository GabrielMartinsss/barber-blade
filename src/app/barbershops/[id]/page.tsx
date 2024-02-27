import { Separator } from '@/components/ui/separator'
import { databasePrisma } from '@/lib/prisma'
import { HeaderBarbershopPage } from './components/header-barbershop-page'
import { MapPin, Star } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { ServicesAndInformations } from './components/services-and-informations'
import { Header } from '@/components/header'
import { Card, CardContent } from '@/components/ui/card'
import { BarbershopInfoCardImage } from '@/components/barbershop-info-card-image'
import { BarbershopPhone } from '@/components/barbershop-phone'
import { HoursList } from './components/hours-list'
import Image from 'next/image'

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
      <HeaderBarbershopPage barbershop={barbershop} />

      <Header variant="withSearch" className="hidden lg:block" />

      <div className="lg:flex lg:gap-10 lg:px-20 2xl:mx-auto 2xl:max-w-[1440px] 2xl:px-32">
        <div className="flex flex-1 flex-col gap-6 ">
          <div className="relative hidden min-h-96 w-full overflow-hidden rounded-lg lg:block">
            <Image
              src={barbershop.imageUrl}
              alt={barbershop.name}
              fill
              sizes="6.875rem"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <section className="-mt-3 px-5 lg:mt-0 lg:flex lg:justify-between lg:px-0">
            <div>
              <h1 className="mb-3 text-xl font-bold dark:text-zinc-50 lg:text-3xl">
                {barbershop.name}
              </h1>
              <div className="mb-2 flex items-center gap-2">
                <MapPin size={14} className="text-primary-500" />
                <span className="text-sm dark:text-zinc-300">
                  {barbershop.address}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Star size={14} className="text-primary-500" />
              <span className="text-sm dark:text-zinc-300">
                {barbershopRating.toFixed(1)} &#40;{barbershop.ratings.length}{' '}
                {barbershop.ratings.length > 1 ? 'avaliações' : 'avaliação'}
                &#41;
              </span>
            </div>

            <Card className="hidden lg:block">
              <CardContent className="flex items-start px-5 py-2.5">
                <div className="h-full w-full">
                  <div className="flex items-center justify-center gap-2 text-xl dark:text-zinc-300">
                    <Star size={20} className="fill-current text-primary-500" />
                    {barbershopRating.toFixed(1)}
                  </div>

                  <span className="text-xs">
                    {barbershop.ratings.length}{' '}
                    {barbershop.ratings.length > 1 ? 'avaliações' : 'avaliação'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator />

          <ServicesAndInformations
            isAuthenticated={isAuthenticated}
            barbershop={barbershop}
          />
        </div>

        <Card className="hidden h-max lg:block">
          <CardContent className="mb-5 max-w-96 lg:min-w-80">
            <div className="space-y-5 px-2">
              <BarbershopInfoCardImage barbershop={barbershop} />

              <div className="space-y-2.5">
                <span className="text-sm font-bold uppercase dark:text-zinc-50">
                  Sobre nós
                </span>
                <p className="text-justify text-sm dark:text-zinc-500">
                  {barbershop.description}
                </p>
              </div>

              <Separator />
              <BarbershopPhone phone={barbershop.telephone} />
              <Separator />
              <HoursList />
              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-sm dark:text-zinc-50">
                  Em parceria com
                </span>
                <Image
                  src="/logo.png"
                  alt="logo Barber Blade"
                  height={18}
                  width={130}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
