import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { z } from 'zod'
import { InputStar } from './input-star'
import { zodResolver } from '@hookform/resolvers/zod'
import { Barbershop } from '@prisma/client'
import { createRating } from '@/app/actions/create-rating'
import { useToast } from '../ui/use-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export interface RatingBarbershopProps {
  barbershop: Barbershop
}

const ratingFormSchema = z.object({
  rating: z.coerce.number(),
})
type RatingFormInput = z.infer<typeof ratingFormSchema>

export function RatingBarbershop({ barbershop }: RatingBarbershopProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitLoding, setIsSubmitLoding] = useState(false)

  const { toast } = useToast()
  const { register, handleSubmit } = useForm<RatingFormInput>({
    resolver: zodResolver(ratingFormSchema),
  })

  async function handleSubmitClick(data: RatingFormInput) {
    if (data.rating === 0) return
    try {
      await createRating({
        ratingValue: data.rating,
        barbershopId: barbershop.id,
      })

      setIsSubmitLoding(true)
      setIsDialogOpen(false)

      toast({
        title: 'Avaliação feita com sucesso!',
        variant: 'success',
      })
    } catch (err) {
      console.error(err)
      setIsDialogOpen(false)

      toast({
        title: 'Opss, algo deu errado!',
        description: 'Não foi possível fazer a avaliação.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitLoding(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full dark:text-zinc-50">Avaliar barbearia</Button>
      </DialogTrigger>

      <DialogContent className="w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-left dark:text-zinc-50">
            Avaliar barbearia
          </DialogTitle>
          <DialogDescription className="text-left">
            Faça sua avaliação para monstrar sua satisfação com{' '}
            <span className="font-bold dark:text-zinc-50">
              {barbershop.name}
            </span>
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <form onSubmit={handleSubmit(handleSubmitClick)}>
          <div className="flex flex-row-reverse justify-center gap-3">
            <InputStar {...register('rating')} value={5} id="5" />
            <InputStar {...register('rating')} value={4} id="4" />
            <InputStar {...register('rating')} value={3} id="3" />
            <InputStar {...register('rating')} value={2} id="2" />
            <InputStar {...register('rating')} value={1} id="1" />
          </div>

          <div className="mt-6 flex gap-3">
            <DialogClose asChild>
              <Button variant="secondary" type="button" className="w-full">
                Voltar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="w-full dark:text-zinc-50"
              disabled={isSubmitLoding}
            >
              {isSubmitLoding && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Enviar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
