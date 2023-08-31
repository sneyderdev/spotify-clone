'use client';

import * as React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import useUploadDialog from '~/hooks/useUploadDialog';

import Dialog from './Dialog';
import Input from './Input';
import Button from './Button';

const formSchema = z.object({
  author: z.string(),
  title: z.string(),
  song: z.custom<File>(),
  image: z.custom<File>(),
});

const UploadDialog = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { closeDialog, isOpen } = useUploadDialog();

  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>(
    {
      resolver: zodResolver(formSchema),
    },
  );

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      closeDialog();
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    //TODO: Upload to Supabase
    console.log(values);
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
          Create
        </Button>
      </form>
    </Dialog>
  );
};

export default UploadDialog;
