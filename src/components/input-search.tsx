'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const searchFormSchema = z.object({
  search: z.string().min(1, 'A busca deve conter no minimo 1 caracter.').trim(),
})
type SearchFormInput = z.infer<typeof searchFormSchema>

interface InputSearchProps {
  defaultValues?: SearchFormInput
}

export function InputSearch({ defaultValues }: InputSearchProps) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  })

  function handleSubmitClick({ search }: SearchFormInput) {
    router.push(`/barbershops?search=${search}`)
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitClick)}>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Busque por uma barbearia..."
          {...register('search')}
        />
        <Button size="icon" type="submit">
          <Search size={20} className="text-zinc-50" />
        </Button>
      </div>

      {errors.search && (
        <span className="text-xs text-red-500">{errors.search.message}</span>
      )}
    </form>
  )
}
