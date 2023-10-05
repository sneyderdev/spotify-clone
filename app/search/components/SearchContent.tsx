'use client';

import useOnPlay from '~/hooks/useOnPlay';
import { Song } from '~/types';

import LibraryItem from '~/components/LibraryItem';
import LikeButton from '~/components/LikeButton';

interface SearchContentProps {
  songs: Array<Song>;
}

const SearchContent = ({ songs }: SearchContentProps) => {
  const onPlay = useOnPlay(songs);

  if (songs.length === 0) {
    return (
      <p className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 px-6">
      {songs.map((song) => (
        <div key={song.id} className="imtens-center flex w-full gap-x-4">
          <div className="flex-1">
            <LibraryItem song={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default SearchContent;
