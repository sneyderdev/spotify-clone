import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils';

const buttonVariants = cva(
  'w-full rounded-full border border-transparent p-3 font-bold text-black transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-green-500',
        secondary: 'bg-white px-6 py-2 ',
        ghost: 'bg-transparent font-medium text-neutral-300',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, className, children, disabled, type = 'button', ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonVariants({ variant }), className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
