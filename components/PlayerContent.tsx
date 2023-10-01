'use client';

import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconVolume3,
  IconVolume2,
} from '@tabler/icons-react';

import { Song } from '~/types';

import LibraryItem from './LibraryItem';
import LikeButton from './LikeButton';
import Slider from './Slider';

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const Icon = true ? IconPlayerPauseFilled : IconPlayerPlayFilled;
  const VolumeIcon = true ? IconVolume3 : IconVolume2;

  return (
    <div className="grid h-full grid-cols-2 md:grid-cols-3">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <LibraryItem song={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>
      <div className="col-auto flex w-full items-center justify-end md:hidden">
        <div
          onClick={() => {}}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon className="text-black" />
        </div>
      </div>
      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
        <button type="button" onClick={() => {}}>
          <IconPlayerSkipBackFilled className="text-neutral-400 transition hover:text-white" />
        </button>
        <div
          onClick={() => {}}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon className="text-black" />
        </div>
        <button type="button" onClick={() => {}}>
          <IconPlayerSkipForwardFilled className="text-neutral-400 transition hover:text-white" />
        </button>
      </div>
      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <button type="button">
            <VolumeIcon />
          </button>
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
