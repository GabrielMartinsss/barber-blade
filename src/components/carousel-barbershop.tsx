import { Prisma } from '@prisma/client'
import { BarbershopItem } from './barbershop-item'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel'
import { tv, VariantProps } from 'tailwind-variants'

const carouselBarbershop = tv({
  slots: {
    containerCarousel: 'px-0 w-full dark:text-zinc-50',
    containerItem: 'lg:basis-1/1 xl:basis-1/3',
  },

  variants: {
    appearance: {
      default: {
        containerCarousel: 'px-0 w-full dark:text-zinc-50',
        containerItem: 'lg:basis-1/2 xl:basis-1/3',
      },
      secondary: {
        containerCarousel: 'px-10 lg:px-0 w-full dark:text-zinc-50',
        containerItem: 'basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5',
      },
    },
  },
  defaultVariants: {
    appearance: 'default',
  },
})

export interface CarouselBarbershopProps
  extends VariantProps<typeof carouselBarbershop> {
  barbershops: Prisma.BarbershopGetPayload<{
    include: {
      ratings: true
    }
  }>[]
}

export function CarouselBarbershop({
  barbershops,
  appearance,
}: CarouselBarbershopProps) {
  const { containerCarousel, containerItem } = carouselBarbershop({
    appearance,
  })

  return (
    <Carousel
      opts={{
        align: 'center',
      }}
      className={containerCarousel()}
    >
      <CarouselContent className="">
        {barbershops.map((barbershop) => (
          <CarouselItem key={barbershop.id} className={containerItem()}>
            <div className="p-1">
              <BarbershopItem barbershop={barbershop} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
