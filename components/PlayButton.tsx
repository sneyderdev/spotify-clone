import { IconPlayerPlayFilled } from '@tabler/icons-react';

const PlayButton = () => {
  return (
    <button
      type="button"
      className="flex translate-y-1/4 items-center rounded-full bg-green-500 p-4 opacity-0 drop-shadow-md transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100"
    >
      <IconPlayerPlayFilled className="text-black" />
    </button>
  );
};

export default PlayButton;
