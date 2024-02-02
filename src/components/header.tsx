import Image from 'next/image'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type HeaderProps = ComponentProps<'header'>

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={twMerge(
        'flex items-center justify-between border-b py-8 dark:border-zinc-900',
        className,
      )}
    >
      <Image src="/logo.png" alt="logo Barber Blade" height={34} width={151} />
      <Button variant="ghost" size="icon">
        <Menu className="dark:text-zinc-50" />
      </Button>
    </header>
  )
}
