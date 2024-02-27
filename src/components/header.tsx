'use client'

import Image from 'next/image'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Menu } from './menu'
import Link from 'next/link'
import { Button } from './ui/button'
import { CalendarDays, LogOut, UserCircle } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { tv, VariantProps } from 'tailwind-variants'
import { InputSearch } from './input-search'

const header = tv({
  base: 'hidden',
  variants: {
    variant: {
      default: '',
      withSearch: 'lg:block flex-1 mx-11',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type HeaderProps = ComponentProps<'header'> & VariantProps<typeof header>

export function Header({ className, variant }: HeaderProps) {
  const { data, status } = useSession()

  async function handleLogoutClick() {
    await signOut()
  }
  async function handleLoginClick() {
    await signIn()
  }

  return (
    <header
      className={twMerge('border-b py-8 dark:border-zinc-900', className)}
    >
      <div className="relative flex items-center justify-between lg:mx-auto lg:px-20 2xl:max-w-[1440px] 2xl:px-32">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo Barber Blade"
            height={34}
            width={151}
          />
        </Link>

        <div className={header({ variant })}>
          <InputSearch />
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          {status === 'authenticated' && (
            <Button
              variant="ghost"
              asChild
              className="items-start gap-2 text-sm dark:text-zinc-50"
            >
              <Link href="/bookings">
                <CalendarDays className="size-4" />
                Agendamentos
              </Link>
            </Button>
          )}

          {data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 dark:text-zinc-50">
                  <Avatar className="size-10">
                    <AvatarFallback>{data?.user?.name ?? ''}</AvatarFallback>
                    <AvatarImage src={data?.user?.image ?? ''} />
                  </Avatar>
                  <h1 className="font-bold">{data?.user?.name}</h1>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem className="gap-3" onClick={handleLogoutClick}>
                  <LogOut className="size-4 dark:text-zinc-50" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={handleLoginClick}
              className="items-start gap-2 dark:text-zinc-50"
            >
              <UserCircle className="size-4" />
              Perfil
            </Button>
          )}
        </div>

        <Menu />
      </div>
    </header>
  )
}
