import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils';

const iconButtonVariants = cva(
  'flex items-center justify-center rounded-full transition',
  {
    variants: {
      variant: {
        default: 'bg-black hover:opacity-75',
        ghost: 'bg-transparent hover:bg-neutral-500 hover:bg-opacity-10',
      },
      size: {
        sm: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({
  variant,
  size,
  className,
  children,
  onClick,
}: IconButtonProps) => {
  return (
    <button
      type="button"
      className={cn(iconButtonVariants({ variant, size }), className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
