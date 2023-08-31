'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import uniqid from 'uniqid';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { IconLoader } from '@tabler/icons-react';

import useUploadDialog from '~/hooks/useUploadDialog';
import { useToast } from '~/hooks/useToast';
import { useUser } from '~/hooks/useUser';

import Dialog from './Dialog';
import Input from './Input';
import Button from './Button';

const formSchema = z.object({
  author: z.string(),
  title: z.string(),
  song: z.custom<FileList>(),
  image: z.custom<FileList>(),
});

const UploadDialog = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { closeDialog, isOpen } = useUploadDialog();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    },
  );

  const { toast } = useToast();

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      closeDialog();
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];

      if (!imageFile || !songFile || !user) {
        return toast({
          title: 'Error adding song',
          description: 'Missing fields.',
          variant: 'destructive',
        });
      }

      const uniqueID = uniqid();

      // Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile);

      if (songError) {
        setIsLoading(false);

        return toast({
          title: 'Error uploading song',
          description: songError.message,
          variant: 'destructive',
        });
      }

      // Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueID}`, imageFile);

      if (imageError) {
        setIsLoading(false);

        return toast({
          title: 'Error uploading song image',
          description: imageError.message,
          variant: 'destructive',
        });
      }

      // Insert song into database
      const { error: songInsertError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        });

      if (songInsertError) {
        setIsLoading(false);

        return toast({
          title: 'Error creating record in database',
          description: songInsertError.message,
          variant: 'destructive',
        });
      }

      router.refresh();

      toast({
        title: 'Song added',
        description: 'Your song has been added to your library.',
      });

      reset();
      closeDialog();
    } catch (error) {
      toast({
        title: 'Error adding song',
        description: 'There was an error adding your song. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Dialog
      title="Add a song"
      description="Upload an .mp3 file to add it to your library."
      isOpen={isOpen}
      onChange={onChange}
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
        <Input
          id="title"
          placeholder="Song title"
          disabled={isLoading}
          {...register('title')}
        />
        <Input
          id="author"
          placeholder="Song author"
          disabled={isLoading}
          {...register('author')}
        />
        <div>
          <label htmlFor="song" className="pb-1">
            Select a song file
          </label>
          <Input
            type="file"
            id="song"
            disabled={isLoading}
            accept=".mp3"
            {...register('song')}
          />
        </div>
        <div>
          <label htmlFor="image" className="pb-1">
            Select an image
          </label>
          <Input
            type="file"
            id="image"
            disabled={isLoading}
            accept="image/*"
            {...register('image')}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <IconLoader className="mx-auto animate-spin" />
          ) : (
            'Add song'
          )}
        </Button>
      </form>
    </Dialog>
  );
};

export default UploadDialog;
