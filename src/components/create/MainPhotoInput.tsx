'use client';
import { useFormContext, useWatch } from 'react-hook-form';
import TextEditor from './TextEditor';
import { FaPlus } from 'react-icons/fa6';

import { uploadImageToSupabaseStorage } from '@/utils/uploadImg';

const MainPhotoInput = () => {
  const { register, setValue } = useFormContext();
  const introduceContent = useWatch({ name: 'mainPhotoInfo.introduceContent' });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const publicUrl = await uploadImageToSupabaseStorage(file);
      if (publicUrl) {
        setValue('mainPhotoInfo.imageUrl', publicUrl);
      }
    }
  };

  const handleSetContent = (value: string) => {
    setValue('mainPhotoInfo.introduceContent', value);
  };

  return (
    <div className='w-full flex flex-col gap-3 justify-center mt-3.5'>
      <div className='w-full flex justify-center items-center'>
        <label className='font-bold text-gray-700 text-[14px] leading-[14px] w-[45px] desktop:w-[56px] whitespace-nowrap'>
          이름
        </label>
        <div className='gap-2 w-full justify-center'>
          <input
            type='text'
            placeholder='좌측'
            {...register('mainPhotoInfo.leftName')}
            maxLength={5}
            className='h-[32px] w-[72px] desktop:w-[80px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black mr-2'
          />
          <input
            type='text'
            placeholder='♥︎'
            {...register('mainPhotoInfo.icon')}
            className='text-center h-[32px] w-[48px] desktop:w-[51px] pl-4 pr-4 border text-[12px] rounded-[8px]  text-black mr-2'
            maxLength={1}
          />
          <input
            type='text'
            placeholder='우측'
            {...register('mainPhotoInfo.rightName')}
            className='h-[32px] w-[72px] desktop:w-[80px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
            maxLength={5}
          />
        </div>
      </div>

      <div className='h-[80px] desktop:h-[128px] desktop:ml-[56px] flex gap-[8px]'>
        <label
          htmlFor='file'
          className='bg-white text-center cursor-pointer px-2 py-1 rounded-xl text-black h-[80px] w-[80px] flex justify-center items-center border border-dashed border-gray-400'
        >
          <FaPlus size={18} />
        </label>
        <input
          type='file'
          id='file'
          className='hidden'
          accept='image/*'
          onChange={handleFileChange}
        />
        <div className='w-[200px] desktop:w-[382px] h-full'>
          <TextEditor
            placeholder='메인화면 문구를 설정해주세요'
            value={introduceContent || ''}
            onChange={handleSetContent}
            style={{ width: '100%', height: '80%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainPhotoInput;
