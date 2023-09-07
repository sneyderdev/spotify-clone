'use client';

import { useEffect, useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import useAuthDialog from '~/hooks/useAuthDialog';
import { useUser } from '~/hooks/useUser';
import { useToast } from '~/hooks/useToast';
import { cn } from '~/utils';

interface LikeButtonProps {
  songId: string;
}

const LikeButton = ({ songId }: LikeButtonProps) => {
  const { supabaseClient } = useSessionContext();

  const authDialog = useAuthDialog();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  const { toast } = useToast();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? IconHeartFilled : IconHeart;

  const handleLike = async () => {
    if (!user) {
      return authDialog.openDialog();
    }

    if (!isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert({ user_id: user.id, song_id: songId });

      if (!error) {
        setIsLiked(true);

        return toast({
          title: 'Song liked',
          description: 'Song has been added to your liked songs.',
        });
      }

      return toast({
        title: 'Error adding like',
        description: error.message,
        variant: 'destructive',
      });
    }

    const { error } = await supabaseClient
      .from('liked_songs')
      .delete()
      .eq('user_id', user.id)
      .eq('song_id', songId);

    if (!error) {
      return setIsLiked(false);
    }

    toast({
      title: 'Error removing like',
      description: error.message,
      variant: 'destructive',
    });
  };

  return (
    <button
      type="button"
      className="transition hover:opacity-75"
      onClick={handleLike}
    >
      <Icon className={cn(isLiked && 'text-green-500')} size={24} />
    </button>
  );
};

export default LikeButton;
