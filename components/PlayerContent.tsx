// @ts-nocheck
'use client';

import { useEffect, useState } from 'react';
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconVolume3,
  IconVolume2,
} from '@tabler/icons-react';
import useSound from 'use-sound';

import usePlayer from '~/hooks/usePlayer';
import { Song } from '~/types';

import LibraryItem from './LibraryItem';
import LikeButton from './LikeButton';
import Slider from './Slider';

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent = ({ song, songUrl }: PlayerContentProps) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? IconPlayerPauseFilled : IconPlayerPlayFilled;
  const VolumeIcon = volume === 0 ? IconVolume3 : IconVolume2;

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onpause: () => setIsPlaying(false),
    format: ['mp3'],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

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
          onClick={handlePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon className="text-black" />
        </div>
      </div>
      <div className="hidden h-full w-full max-w-[722px] items-center justify-center gap-x-6 md:flex">
        <button type="button" onClick={onPlayPrevious}>
          <IconPlayerSkipBackFilled className="text-neutral-400 transition hover:text-white" />
        </button>
        <div
          onClick={handlePlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
        >
          <Icon className="text-black" />
        </div>
        <button type="button" onClick={onPlayNext}>
          <IconPlayerSkipForwardFilled className="text-neutral-400 transition hover:text-white" />
        </button>
      </div>
      <div className="hidden w-full justify-end pr-2 md:flex">
        <div className="flex w-[120px] items-center gap-x-2">
          <button type="button" onClick={toggleMute}>
            <VolumeIcon />
          </button>
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
