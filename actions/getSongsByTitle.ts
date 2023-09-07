import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import type { Song } from '~/types';

import getSongs from './getSongs';

const getSongsByTitle = async (title: string): Promise<Array<Song>> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  if (!title) {
    const allSongs = await getSongs();

    return allSongs;
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .like('title', `%${title}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
  }

  return (data as any) || [];
};

export default getSongsByTitle;
