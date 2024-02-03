'use client'

import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { ChevronLeft, Menu } from 'lucide-react'
import { Barbershop } from '@prisma/client'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  barbershop: Barbershop
}

export function Header({ barbershop }: HeaderProps) {
  const router = useRouter()

  function handleBackClick() {
    router.back()
  }

  return (
    <div className="relative h-[15.625rem] w-full">
      <Button
        variant="outline"
        size="icon"
        className="absolute left-5 top-6 z-50"
        onClick={handleBackClick}
      >
        <ChevronLeft size={20} className="dark:text-zinc-50" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-5 top-6 z-50"
      >
        <Menu size={20} className="dark:text-zinc-50" />
      </Button>
      <Image
        src={barbershop.imageUrl}
        alt={barbershop.name}
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
