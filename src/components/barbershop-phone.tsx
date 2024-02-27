'use client'

import { Smartphone } from 'lucide-react'
import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

export interface BarbershopPhoneProps {
  phone: string
}

export function BarbershopPhone({ phone }: BarbershopPhoneProps) {
  const { toast } = useToast()
  async function handleClipboardClick() {
    try {
      await navigator.clipboard.writeText(phone)
      toast({
        variant: 'success',
        title: 'Copiado.',
        description: 'Telefone copiado com sucesso!',
      })
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Opss, algo deu errado.',
        description: 'Não foi possível copiar o telefone!',
      })
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Smartphone className="size-6 dark:text-zinc-50" />
        <span className="text-sm dark:text-zinc-50">{phone}</span>
      </div>
      <Button onClick={handleClipboardClick} variant="secondary">
        Copiar
      </Button>
    </div>
  )
}
