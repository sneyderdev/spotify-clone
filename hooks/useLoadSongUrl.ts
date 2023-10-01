import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Song } from '~/types';

const useLoadSongUrl = (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return '';
  }

  const { data: songUrl } = supabaseClient.storage
    .from('songs')
    .getPublicUrl(song.song_path);

  return songUrl.publicUrl;
};

export default useLoadSongUrl;
