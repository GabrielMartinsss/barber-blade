import { Star } from 'lucide-react'
import { ComponentProps, forwardRef } from 'react'

type InputStarProps = ComponentProps<'input'>

const InputStar = forwardRef<HTMLInputElement, InputStarProps>(
  ({ ...props }, ref) => {
    return (
      <>
        <input
          {...props}
          type="radio"
          className="- peer -ms-11 size-8 cursor-pointer appearance-none border-0 bg-transparent text-transparent checked:bg-none focus:bg-none focus:ring-0 focus:ring-offset-0"
          ref={ref}
        />
        <label
          htmlFor={props.id}
          className="pointer-events-none text-zinc-500 peer-checked:text-primary-500 dark:text-zinc-500 dark:peer-checked:text-primary-500"
        >
          <Star className="size-8 fill-current" />
        </label>
      </>
    )
  },
)

InputStar.displayName = 'InputStar'
export { InputStar }
