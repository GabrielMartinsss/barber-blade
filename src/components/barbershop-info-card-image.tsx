import { Barbershop } from '@prisma/client'
import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export interface BarbershopInfoCardImageProps {
  barbershop: Barbershop
}

export function BarbershopInfoCardImage({
  barbershop,
}: BarbershopInfoCardImageProps) {
  return (
    <div className="relative h-[180px] w-full px-5">
      <Image
        src="/barbershopMap.png"
        alt={barbershop.name}
        fill
        style={{ objectFit: 'fill' }}
      />

      <Card className="absolute bottom-5 left-1/2 w-[90%] -translate-x-1/2 px-5 py-3">
        <CardContent className="flex items-center gap-3 p-0">
          <Avatar className="size-12">
            <AvatarFallback className="text-sm">
              {barbershop.name[0]}
            </AvatarFallback>
            <AvatarImage src={barbershop.imageUrl} />
          </Avatar>

          <div className="flex flex-col justify-center overflow-hidden text-ellipsis">
            <span className="block font-bold">{barbershop.name}</span>
            <span className="truncate text-xs text-zinc-400">
              {barbershop.address}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
