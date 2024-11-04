import { StickerImage } from '@/types/stickerData.types';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';

type PropsType = {
  stickerImage: StickerImage;
};

const StickerSlot = ({ stickerImage }: PropsType) => {
  const { setValue, control } = useFormContext();
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  });

  const handleSelectSticker = () => {
    const stickers = stickersWatch || [];

    stickers.push({
      id: `${crypto.randomUUID()}-${stickerImage.id}`,
      url: `${stickerImage.url}`,
      stickerImageId: stickerImage.id,
      posX: '0',
      posY: '0',
      width: stickerImage.width ?? 100,
      height: stickerImage.height ?? 100,
      rotation: 0,
    });

    setValue('stickers', stickers);
  };

  return (
    <div
      className='flex justify-center items-center p-[8px] border border-gray-200 rounded-[12px] aspect-square w-full h-full hover:cursor-pointer'
      onClick={handleSelectSticker}
    >
      <div className='relative w-full h-full'>
        <Image
          alt='sticker'
          key={stickerImage.id}
          src={stickerImage.url}
          className='object-contain'
          fill
        />
      </div>
    </div>
  );
};

export default StickerSlot;
