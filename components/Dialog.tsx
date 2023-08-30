import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IconX } from '@tabler/icons-react';

import IconButton from './IconButton';

interface DialogProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

const Dialog = ({
  isOpen,
  onChange,
  title,
  description,
  children,
}: DialogProps) => {
  return (
    <DialogPrimitive.Root
      defaultOpen={isOpen}
      open={isOpen}
      onOpenChange={onChange}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-neutral-900/90 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] h-full max-h-full w-full translate-x-[-50%] translate-y-[-50%] rounded-md border border-neutral-700 bg-neutral-800 p-6 drop-shadow-md focus:outline-none md:h-auto md:max-h-[85vh] md:w-[90vw] md:max-w-[450px]">
          <DialogPrimitive.Title className="mb-4 text-center text-xl font-bold">
            {title}
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mb-5 text-center text-sm leading-normal">
            {description}
          </DialogPrimitive.Description>
          <div>{children}</div>
          <DialogPrimitive.Close asChild>
            <IconButton
              variant="ghost"
              className="absolute right-2 top-2 text-neutral-400 hover:text-white"
            >
              <IconX size={20} />
            </IconButton>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
