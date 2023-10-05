'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useUser } from '~/hooks/useUser';
import useOnPlay from '~/hooks/useOnPlay';
import { Song } from '~/types';

import LibraryItem from '~/components/LibraryItem';
import LikeButton from '~/components/LikeButton';

interface LikedContentProps {
  songs: Array<Song>;
}

const LikedContent = ({ songs }: LikedContentProps) => {
  const router = useRouter();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <p className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No liked songs.
      </p>
    );
  }

  return (
    <div className="flex w-full flex-col gap-y-2 p-6">
      {songs.map((song) => (
        <div key={song.id} className="items-cneter flex w-full gap-x-4">
          <div className="flex-1">
            <LibraryItem song={song} onClick={(id: string) => onPlay(id)} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
