import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Song } from '~/types';

const useLoadImage = (song: Song) => {
  const supabase = useSupabaseClient();

  if (!song) {
    return null;
  }

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(song.image_path);

  return data.publicUrl;
};

export default useLoadImage;
