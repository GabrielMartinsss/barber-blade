'use client'

import {
  CalendarRange,
  Home,
  LogIn,
  LogOut,
  MenuIcon,
  User,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from './ui/sheet'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export function Menu() {
  const session = useSession()
  const isSignedIn = session.status === 'authenticated'

  async function handleLoginClick() {
    await signIn('google')
  }

  async function handleLogoutClick() {
    await signOut()
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="absolute right-5 z-30">
          <MenuIcon className="dark:text-zinc-50" />
        </Button>
      </SheetTrigger>

      <SheetContent className="right-0 h-screen w-[90%] p-0 dark:text-zinc-50">
        <SheetHeader className="h-fit border-b border-zinc-800 px-5 py-6">
          <SheetTitle className="text-left text-lg font-bold">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 px-5 py-6">
          {isSignedIn ? (
            <div className="flex flex-1 items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar className="size-10">
                  <AvatarFallback>{session.data?.user?.name[0]}</AvatarFallback>
                  <AvatarImage src={session.data?.user?.image ?? ''} />
                </Avatar>
                <h1 className="font-bold">{session.data?.user?.name}</h1>
              </div>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleLogoutClick}
              >
                <LogOut size={20} />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Avatar className="size-10">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <span>Olá, faça seu login!</span>
              </div>
              <Button
                className="flex items-center justify-start gap-2 text-sm font-bold"
                variant="secondary"
                onClick={handleLoginClick}
              >
                <LogIn size={16} />
                Fazer login
              </Button>
            </div>
          )}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="flex w-full items-center justify-start gap-2"
            >
              <Home size={16} />
              Início
            </Button>
            <Button
              variant="outline"
              className="flex w-full items-center justify-start gap-2"
            >
              <CalendarRange size={16} />
              Agendamentos
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
