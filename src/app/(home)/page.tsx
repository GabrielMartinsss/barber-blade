import { format } from 'date-fns'
import { Header } from '@/components/header'
import { ptBR } from 'date-fns/locale'

export default function Home() {
  return (
    <div className="">
      <Header />

      <div className="px-5 py-6">
        <h2 className="text-xl dark:text-zinc-50">
          Olá, <span className="font-bold"> Faça seu login!</span>
        </h2>
        <span className="text-sm capitalize dark:text-zinc-300">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </span>
      </div>
    </div>
  )
}
