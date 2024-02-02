import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Card, CardContent } from './ui/card'

export function BookingItem() {
  return (
    <Card>
      <CardContent className="flex pr-0">
        <div className="flex flex-1 flex-col gap-2 py-3">
          <Badge className="w-fit border-none dark:bg-primary-600/20 dark:text-primary-400 dark:hover:bg-primary-600/20">
            Confirmado
          </Badge>
          <h2 className="mt-1 font-bold dark:text-zinc-50">Corte de cabelo</h2>

          <div className="flex items-center gap-2">
            <Avatar className="size-7">
              <AvatarFallback className="text-sm">M</AvatarFallback>
              <AvatarImage src="https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png" />
            </Avatar>
            <span className="text-sm dark:text-zinc-300">Vintage Barber</span>
          </div>
        </div>

        <div className="flex min-w-[6.625rem] flex-col items-center justify-center border-l border-zinc-800 text-xs dark:text-zinc-50">
          <p>Fevereiro</p>
          <p className="text-2xl">06</p>
          <p>09:45</p>
        </div>
      </CardContent>
    </Card>
  )
}
