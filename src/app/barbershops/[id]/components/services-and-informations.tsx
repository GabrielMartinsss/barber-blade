'use client'

import { Button } from '@/components/ui/button'
import { Prisma } from '@prisma/client'
import { ServiceItem } from './service-item'
import { useState } from 'react'
import { Separator } from '@/components/ui/separator'
import { Smartphone } from 'lucide-react'

interface ServicesAndInformationsProps {
  isAuthenticated: boolean
  barbershop: Prisma.BarbershopGetPayload<{
    include: {
      services: true
    }
  }>
}

const weekDays = [
  'Segunda-Feira',
  'Terça-Feira',
  'Quarta-Feira',
  'Quinta-Feira',
  'Sexta-Feira',
  'Sabado',
]

export function ServicesAndInformations({
  isAuthenticated,
  barbershop,
}: ServicesAndInformationsProps) {
  const [buttonSelected, setButtonSelected] = useState<
    'services' | 'informations'
  >('services')

  return (
    <section className="space-y-6 px-5">
      <div className="flex gap-2">
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
        <div className="flex flex-col gap-3">
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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Smartphone className="size-6 dark:text-zinc-50" />
              <span className="text-sm dark:text-zinc-50">
                {barbershop.telephone}
              </span>
            </div>
            <Button variant="secondary"> Copiar</Button>
          </div>

          <Separator />

          <div className="space-y-2.5 text-sm capitalize dark:text-zinc-50">
            <div className="flex items-center justify-between">
              <span className="dark:text-zinc-500">Domingo</span>
              <span>Fechado</span>
            </div>
            {weekDays.map((day) => (
              <div key={day} className="flex items-center justify-between">
                <span className="dark:text-zinc-500">{day}</span>
                <span>09:00 - 21:00</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
