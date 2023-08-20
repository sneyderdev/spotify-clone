'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { IconPlayerPlayFilled } from '@tabler/icons-react';

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();

  const onClick = () => {
    //TODO: Add auth before push
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative flex items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 pr-4 transition hover:bg-neutral-100/20"
    >
      <div className="relative min-h-[80px] min-w-[80px]">
        <Image className="object-cover" fill src={image} alt={name} />
      </div>
      <p className="truncate font-bold">{name}</p>
      <div className="absolute right-5 flex items-center justify-center rounded-full bg-green-500 p-3 text-black opacity-0 drop-shadow-md transition hover:scale-105 group-hover:opacity-100">
        <IconPlayerPlayFilled />
      </div>
    </button>
  );
};

export default ListItem;
