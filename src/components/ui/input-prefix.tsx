import * as React from 'react'

import { cn } from '@/lib/utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const InputWithPrefix = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
          className,
        )}
      >
        <span className="text-sm">{prefix}</span>
        <input
          type={type}
          ref={ref}
          {...props}
          className="outline-none text-bg-slate-950"
        />
      </div>
    )
  },
)
InputWithPrefix.displayName = 'InputPrefix'

export { InputWithPrefix }
