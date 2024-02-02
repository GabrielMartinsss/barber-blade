import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type InputSearchProps = ComponentProps<'div'>

export function InputSearch({ className }: InputSearchProps) {
  return (
    <div className={twMerge('flex items-center gap-2', className)}>
      <Input placeholder="Busque por uma barbearia..." />
      <Button size="icon">
        <Search size={20} className="text-zinc-50" />
      </Button>
    </div>
  )
}
