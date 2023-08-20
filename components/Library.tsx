'use client';

import { IconPlaylist, IconPlus } from '@tabler/icons-react';

import IconButton from './IconButton';

const Library = () => {
  const onClick = () => {
    //TODO: Handle upload later
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
      <div className="mt-4 flex flex-col gap-y-2 px-3">Songs</div>
    </div>
  );
};

export default Library;
