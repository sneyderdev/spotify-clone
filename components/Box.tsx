import { cn } from '~/utils';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box = ({ children, className }: BoxProps) => {
  return (
    <section
      className={cn('h-fit w-full rounded-lg bg-neutral-900', className)}
    >
      {children}
    </section>
  );
};

export default Box;
