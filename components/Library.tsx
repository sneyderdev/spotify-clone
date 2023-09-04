'use client';

import { IconPlaylist, IconPlus } from '@tabler/icons-react';

import useAuthDialog from '~/hooks/useAuthDialog';
import useUploadDialog from '~/hooks/useUploadDialog';
import { useUser } from '~/hooks/useUser';
import { Song } from '~/types';

import IconButton from './IconButton';
import LibraryItem from './LibraryItem';

interface LibraryProps {
  songs: Array<Song>;
}

const Library = ({ songs }: LibraryProps) => {
  const authDialog = useAuthDialog();
  const uploadDialog = useUploadDialog();
  const { user } = useUser();

  const onClick = () => {
    if (!user) {
      return authDialog.openDialog();
    }

    //TODO: Check for subscription

    return uploadDialog.openDialog();
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <IconPlaylist size={26} className="text-neutral-400" />
          <p className="text-md font-medium text-neutral-400">Your Library</p>
        </div>
        <IconButton
          variant="ghost"
          onClick={onClick}
          className="text-neutral-400 hover:text-white"
        >
          <IconPlus size={20} />
        </IconButton>
      </div>
      <div className="mt-4 flex flex-col gap-y-2 px-3">
        {songs.map((song) => (
          <LibraryItem key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default Library;
