'use client';

import { StickerType } from '@/types/invitationFormType.type';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useStickerMove from '@/hooks/invitation/sticker/useStickerMove';
import useStickerRotation from '@/hooks/invitation/sticker/useStickerRotation';

const Sticker = ({
  sticker,
  previewRef,
  activeStickerId,
  onActivate,
}: {
  sticker: StickerType;
  previewRef: MutableRefObject<HTMLDivElement | null>;
  activeStickerId: string | null;
  onActivate: (id: string | null) => void;
}) => {
  const { setValue, control } = useFormContext();
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  }) as StickerType[];
  const stickerRef = useRef<HTMLDivElement | null>(null);
  const isActive = activeStickerId === sticker.id; // 상위 컴포넌트에서 활성화된 스티커가 하나이도록 관리할 거기 때문에 상위에서 받아서 해당 컴포넌트의 아이디와 비교하는 것이 적합하다고 생각
  const { handleTouchStart, handleMouseDown } = useStickerMove({
    sticker,
    previewRef,
    stickerRef,
    stickersWatch,
    setValue,
    onActivate,
  });

  const { handleTouchRotationStart } = useStickerRotation({
    sticker,
    stickerRef,
    stickersWatch,
    setValue,
    isActive,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (activeStickerId === sticker.id && stickerRef.current && !stickerRef.current.contains(e.target as Node)) {
        onActivate(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeStickerId]);

  return (
    <div
      ref={stickerRef}
      className={`${isActive && 'border-[1px] border-primary-300'} box-content origin-center transform`}
      style={{
        position: 'absolute',
        top: `${sticker.posY}%`,
        left: `${sticker.posX}%`,
        width: `${sticker.width}px`,
        height: `${sticker.height}px`,
        transform: `rotate(${sticker.rotation}deg) scale(${sticker.scale ?? 1})`,
      }}
    >
      {isActive && (
        <>
          <div
            className='absolute bg-primary-300 w-[6px] h-[6px] rounded-full touch-none'
            style={{
              top: '-3px', // 핸들러의 중점이 부모의 모서리에 위치하도록 설정
              left: '-3px',
              transform: `scale(${1 / (sticker.scale ?? 1)})`, // 역 scale 적용으로 크기 고정
            }}
            onTouchStart={handleTouchRotationStart}
          ></div>
          <div
            className='absolute bg-primary-300 w-[6px] h-[6px] rounded-full touch-none'
            style={{
              bottom: '-3px',
              left: '-3px',
              transform: `scale(${1 / (sticker.scale ?? 1)})`,
            }}
            onTouchStart={handleTouchRotationStart}
          ></div>
          <div
            className='absolute bg-primary-300 w-[6px] h-[6px] rounded-full touch-none'
            style={{
              bottom: '-3px',
              right: '-3px',
              transform: `scale(${1 / (sticker.scale ?? 1)})`,
            }}
            onTouchStart={handleTouchRotationStart}
          ></div>
        </>
      )}
      <img
        src={sticker.url}
        alt={sticker.stickerImageId}
        className='w-full h-full touch-none'
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Sticker;
