import { cn } from '~/utils';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <div className={cn('h-fit w-full rounded-lg bg-neutral-900', className)}>
      {children}
    </div>
  );
};

export default Box;
