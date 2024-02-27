'use client'

import { Button } from '@/components/ui/button'
import { Prisma } from '@prisma/client'
import { ServiceItem } from './service-item'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { BarbershopPhone } from '@/components/barbershop-phone'
import { HoursList } from './hours-list'

interface ServicesAndInformationsProps {
  isAuthenticated: boolean
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      services: true
    }
  }>
}

export function ServicesAndInformations({
  isAuthenticated,
  barbershop,
}: ServicesAndInformationsProps) {
  const [buttonSelected, setButtonSelected] = useState<
    'services' | 'informations'
  >('services')

  return (
    <section className="space-y-6 px-5 lg:px-0">
      <div className="flex gap-2 lg:hidden">
        <Button
          onClick={() => setButtonSelected('services')}
          variant={buttonSelected === 'services' ? 'default' : 'secondary'}
          className="dark:text-zinc-50"
        >
          Serviços
        </Button>
        <Button
          onClick={() => setButtonSelected('informations')}
          variant={buttonSelected === 'informations' ? 'default' : 'secondary'}
          className="dark:text-zinc-50"
        >
          Informações
        </Button>
      </div>

      {buttonSelected === 'services' ? (
        <div className="flex flex-col gap-3 lg:grid lg:grid-cols-1 xl:grid-cols-2">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              barbershop={barbershop}
              service={service}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase dark:text-zinc-500">
              Sobre nós
            </h2>
            <p className="text-justify text-sm dark:text-zinc-50">
              {barbershop.description}
            </p>
          </div>

          <Separator />

          <BarbershopPhone phone={barbershop.telephone} />

          <Separator />

          <HoursList />
        </div>
      )}
    </section>
  )
}
