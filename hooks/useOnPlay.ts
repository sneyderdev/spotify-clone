import usePlayer from './usePlayer';
import useAuthDialog from './useAuthDialog';
import { useUser } from './useUser';
import { Song } from '~/types';

const useOnPlay = (songs: Array<Song>) => {
  const player = usePlayer();
  const authDialog = useAuthDialog();
  const { user } = useUser();

  const onPlay = (id: string) => {
    if (!user) {
      return authDialog.openDialog();
    }

    player.setId(id);
    player.setIds(songs.map((song) => song.id));
  };

  return onPlay;
};

export default useOnPlay;
