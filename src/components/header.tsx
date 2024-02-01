import Image from 'next/image'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b px-5 py-8 dark:border-zinc-900">
      <Image src="/logo.png" alt="logo Barber Blade" height={34} width={151} />
      <Button variant="ghost" size="icon">
        <Menu className="dark:text-zinc-50" />
      </Button>
    </header>
  )
}
