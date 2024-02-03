import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { databasePrisma } from '@/lib/prisma'
import { Header } from './components/header'
import { MapPin, Star } from 'lucide-react'
import { ServiceItem } from './components/service-item'

export interface BarbershopDetailPageProps {
  params: {
    id?: string
  }
}

export default async function BarbershopDetailPage({
  params: { id },
}: BarbershopDetailPageProps) {
  if (!id) {
    // TODO: this should redirect to home page
    return null
  }

  const barbershop = await databasePrisma.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    // TODO: this should redirect to home page
    return null
  }

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
            5,0 (889 avaliações)
          </span>
        </div>
      </section>

      <Separator />

      <section className="space-y-6 px-5">
        <div className="flex gap-2">
          <Button className="dark:text-zinc-50">Serviços</Button>
          <Button variant="outline" className="dark:text-zinc-50">
            Informações
          </Button>
        </div>

        <div className="flex flex-col gap-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </section>
    </main>
  )
}
