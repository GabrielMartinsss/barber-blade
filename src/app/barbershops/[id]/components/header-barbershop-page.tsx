'use client'

import Image from 'next/image'
import { Menu } from '@/components/menu'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { Barbershop } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface HeaderBarbershopPageProps {
  barbershop: Barbershop
}

export function HeaderBarbershopPage({
  barbershop,
}: HeaderBarbershopPageProps) {
  const router = useRouter()

  function handleBackClick() {
    router.replace('/')
  }

  return (
    <div className="relative h-[15.625rem] w-full py-6 lg:hidden">
      <Button
        variant="outline"
        size="icon"
        className="absolute left-5 top-6 z-50"
        onClick={handleBackClick}
      >
        <ChevronLeft size={20} className="dark:text-zinc-50" />
      </Button>
      <Menu />
      <Image
        src={barbershop.imageUrl}
        alt={barbershop.name}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
