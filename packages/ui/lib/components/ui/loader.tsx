import type * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const loaderVariants = cva('inline-flex items-center justify-center', {
  variants: {
    variant: {
      spinner: 'relative',
      dots: 'gap-1',
      pulse: '',
      skeleton: 'bg-muted animate-pulse rounded',
    },
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
  },
  defaultVariants: {
    variant: 'spinner',
    size: 'md',
  },
});

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {
  text?: string;
  color?: string;
}

export function Loader({
  className,
  variant,
  size,
  text = 'Cargando...',
  color = 'currentColor',
  ...props
}: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={text}
      className={cn('flex flex-col items-center justify-center', className)}
      {...props}>
      <div className={cn(loaderVariants({ variant, size }))}>
        {variant === 'spinner' && (
          <div
            className="animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
            style={{
              borderColor: `${color} transparent ${color} ${color}`,
              width: '100%',
              height: '100%',
            }}
          />
        )}

        {variant === 'dots' && (
          <>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="animate-bounce rounded-full"
                style={{
                  backgroundColor: color,
                  width: size === 'sm' ? '6px' : size === 'md' ? '8px' : size === 'lg' ? '10px' : '12px',
                  height: size === 'sm' ? '6px' : size === 'md' ? '8px' : size === 'lg' ? '10px' : '12px',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </>
        )}

        {variant === 'pulse' && (
          <div
            className="animate-pulse rounded-full"
            style={{
              backgroundColor: color,
              width: '100%',
              height: '100%',
            }}
          />
        )}

        {variant === 'skeleton' && <div className="w-full h-full" />}
      </div>
      {text && <span className="sr-only">{text}</span>}
    </div>
  );
}
