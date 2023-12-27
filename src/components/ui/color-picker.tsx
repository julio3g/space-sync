import React from 'react'

import { COLORS } from '@/lib/colors'
import { cn } from '@/lib/utils'

import { InputWithFix } from './input-fix'

type ColorPickerInputProps = {
  value: string
  onChange: (color: string) => void
  className?: string
}

const ColorPickerInput = React.forwardRef<
  HTMLInputElement,
  ColorPickerInputProps
>(({ value, onChange, className }, ref) => {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <div className="flex gap-1.5">
        {COLORS.map((color) => (
          <div
            key={color}
            style={{ background: color }}
            className="h-5 w-5 cursor-pointer rounded-full"
            onClick={() => onChange(color)}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-sm font-normal">
          Cor customizada
        </span>
        <InputWithFix
          ref={ref}
          id="custom"
          type="text"
          value={value}
          prefix={
            <span
              style={{ background: value }}
              className="flex h-4 w-4 rounded"
            />
          }
          onChange={(e) => onChange(e.target.value)}
          className="h-auto w-16 space-x-1 rounded-lg text-xs text-slate-500"
        />
      </div>
    </div>
  )
})

ColorPickerInput.displayName = 'ColorPickerInput'

export { ColorPickerInput }
