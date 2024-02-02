import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export function InputSearch() {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Busque por uma barbearia..." />
      <Button size="icon">
        <Search size={20} className="text-zinc-50" />
      </Button>
    </div>
  )
}
