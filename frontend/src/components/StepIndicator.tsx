import { Check, Circle } from 'lucide-react'
import clsx from 'clsx'

interface StepIndicatorProps {
  currentStep: number
  steps: string[]
}

export function StepIndicator({ currentStep, steps }: StepIndicatorProps) {
  return (
    <ol className="flex flex-wrap items-center gap-3 text-xs sm:gap-4 sm:text-sm">
      {steps.map((step, index) => {
        const completed = index < currentStep
        const active = index === currentStep

        return (
          <li key={step} className="inline-flex items-center gap-2">
            <span
              className={clsx(
                'inline-flex h-6 w-6 items-center justify-center rounded-full ring-1 ring-inset transition-colors',
                completed && 'bg-blue-600 text-white ring-blue-600',
                active && 'bg-blue-100 text-blue-700 ring-blue-300',
                !completed && !active && 'bg-white text-slate-400 ring-slate-300',
              )}
            >
              {completed ? <Check className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
            </span>
            <span className={clsx('font-medium', active ? 'text-slate-900' : 'text-slate-500')}>{step}</span>
          </li>
        )
      })}
    </ol>
  )
}
