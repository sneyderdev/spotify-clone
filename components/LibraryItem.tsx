'use client';

import Image from 'next/image';

import useLoadImage from '~/hooks/useLoadImage';
import { Song } from '~/types';

interface LibraryItemProps {
  song: Song;
}

const LibraryItem = ({ song }: LibraryItemProps) => {
  const imageUrl = useLoadImage(song);

  return (
    <div className="flex w-full items-center gap-x-3 rounded-md p-2 hover:bg-neutral-800/50">
      <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
        <Image
          src={imageUrl || '/images/liked.png'}
          fill
          alt={song.title}
          className="object-cover"
        />
      </div>
      <div className="oveflow-hidden flex flex-col gap-y-1">
        <p className="truncate text-white">{song.title}</p>
        <p className="truncate text-sm text-neutral-400">{song.author}</p>
      </div>
    </div>
  );
};

export default LibraryItem;
