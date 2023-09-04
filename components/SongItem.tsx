'use client';

import Image from 'next/image';

import useLoadImage from '~/hooks/useLoadImage';
import { Song } from '~/types';

import PlayButton from './PlayButton';

interface SongItemProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  song: Song;
}

const SongItem = ({ onClick, song }: SongItemProps) => {
  const imagePath = useLoadImage(song);

  return (
    <div
      onClick={() => {}}
      className="group relative flex flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-3 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Image
          src={imagePath || '/images/liked.png'}
          className="object-cover"
          fill
          alt={song.title}
        />
      </div>
      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">{song.title}</p>
        <p className="w-full truncate pb-4 text-sm text-neutral-400">
          By {song.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  );
};

export default SongItem;
