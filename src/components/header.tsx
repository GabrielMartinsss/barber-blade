import Image from 'next/image'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Menu } from './menu'
import Link from 'next/link'

type HeaderProps = ComponentProps<'header'>

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={twMerge(
        'relative flex items-center justify-between border-b py-8 dark:border-zinc-900',
        className,
      )}
    >
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo Barber Blade"
          height={34}
          width={151}
        />
      </Link>

      <Menu />
    </header>
  )
}
