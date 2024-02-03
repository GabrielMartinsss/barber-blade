import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Service } from '@prisma/client'
import Image from 'next/image'

export interface ServiceItemProps {
  service: Service
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card>
      <CardContent className="flex gap-3 p-3">
        <div className="relative size-[6.875rem] overflow-hidden rounded-lg">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-sm font-bold dark:text-zinc-50">
            {service.name}
          </h2>
          <p className="flex-1 text-sm dark:text-zinc-500">
            {service.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-primary-500">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(service.price.toNumber())}
            </span>
            <Button variant="secondary">Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
