import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { cancelBooking } from '@/app/actions/cancel-booking'
import { Booking } from '@prisma/client'
import { Loader2 } from 'lucide-react'

interface CancelBookingAlertDialogProps {
  booking: Booking
}

export function CancelBookingAlertDialog({
  booking,
}: CancelBookingAlertDialogProps) {
  const [isCanceledBooking, setIsCanceledBooking] = useState(false)
  const [isCanceledBookingLoading, setIsCanceledBookingLoading] =
    useState(false)
  const router = useRouter()

  async function handleCancelBookingClick() {
    setIsCanceledBookingLoading(true)
    try {
      await cancelBooking(booking.id)
    } catch (error) {
      console.error(error)
    } finally {
      setIsCanceledBookingLoading(false)
      setIsCanceledBooking(false)
      router.refresh()
    }
  }

  return (
    <AlertDialog open={isCanceledBooking}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => {
            setIsCanceledBooking(true)
          }}
          variant="destructive"
          className="flex-1"
        >
          Cancelar reserva
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[318px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-zinc-50">
            Cancelar reserva
          </AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja cancelar esse agendamento?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <div className="flex items-center gap-3">
            <Button asChild variant="secondary">
              <AlertDialogCancel
                onClick={() => {
                  setIsCanceledBooking(false)
                  router.refresh()
                }}
                className="w-full dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
              >
                Voltar
              </AlertDialogCancel>
            </Button>

            <Button
              asChild
              disabled={isCanceledBookingLoading}
              variant="destructive"
              className="flex w-full items-center gap-2 capitalize dark:text-zinc-50"
            >
              <AlertDialogAction
                onClick={() => {
                  handleCancelBookingClick()
                  router.refresh()
                }}
              >
                {isCanceledBookingLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin dark:text-zinc-50" />
                    cancelando
                  </>
                ) : (
                  'Confirmar'
                )}
              </AlertDialogAction>
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
