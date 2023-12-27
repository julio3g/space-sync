import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = {
  className?: string
  type?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'>

const InputWithFix = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, suffix, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 min-w-max items-center rounded-md border border-input px-3 py-2 text-sm font-normal ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
          className,
        )}
      >
        {prefix && <>{prefix}</>}
        <input
          type={type}
          ref={ref}
          {...props}
          className={cn('text-bg-slate-950 outline-none ', className)}
        />
        {suffix && <>{suffix}</>}
      </div>
    )
  },
)
InputWithFix.displayName = 'InputWithFix'

export { InputWithFix }
