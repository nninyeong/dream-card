'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../ui/Button';
import { useDeleteInvitationCard, useGetAllinvitationCard } from '@/hooks/queries/mypage/useMypage';
import { Confirm, Notify } from 'notiflix';
import { calculateProgressPercentage } from '@/utils/calculateProgressPercentage';
import { MyInvitationCardLoading } from '../loading/MypageLoading';

type MyInvitationCardProps = {
  id: string;
};

const MyInvitationCard: React.FC<MyInvitationCardProps> = ({ id }) => {
  const [progressPercentage, setProgressPercentage] = useState<number | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      const result = await calculateProgressPercentage(id);
      setProgressPercentage(result);
    };

    fetchProgress();
  }, [id]);

  const { data: invitationCards, isLoading, error } = useGetAllinvitationCard();

  const mutation = useDeleteInvitationCard();

  const handleDeleteCards = (invitationId: string) => {
    Confirm.show('청첩장을 삭제하시겠습니까?', '삭제를 원하시면 Yes를 눌러주세요', 'Yes', 'No', () => {
      mutation.mutate(invitationId);
    });
  };

  if (isLoading) return <MyInvitationCardLoading />;
  if (error) return <div>error</div>;

  const invitationCard = invitationCards?.[0];
  const invitationUrl = `${window.location.origin}/card/${invitationCard?.id}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: invitationCard?.greeting_message?.title || '우리 결혼합니다.',
          url: invitationUrl,
        });
        Notify.success('링크복사가 완료되었습니다.');
      } else {
        await navigator.clipboard.writeText(invitationUrl);
        Notify.success('링크가 클립보드에 복사되었습니다.');
      }
    } catch (error) {
      Notify.failure('취소되었습니다.');
      console.log(error);
    }
  };

  const handlePrintAsPDF = () => {
    const newWindow = window.open(invitationUrl, '_blank');

    newWindow?.print();
  };

  const gradientColor =
    progressPercentage !== null
      ? `conic-gradient(#ff6666 ${progressPercentage}%, #e0e0e0 0%)`
      : 'conic-gradient( #e0e0e0 0%, #FFFFFF 100%)';

  return (
    <div className='mobile:w-full  desktop:h-[228px] mobile:h-[152px] flex mx-auto rounded-xl  shadow-sm shadow-gray-400 p-4 relative desktop:flex-[3] '>
      {invitationCard ? (
        <div className='w-full flex desktop:justify-center mobile:justify-between  items-center  mobile:gap-8 desktop:gap-14'>
          <Link href={`/create/card`}>
            <div className='desktop:w-[136px] desktop:h-[136px] mobile:w-[96px] mobile:h-[96px] relative flex justify-center items-center '>
              <div
                className='w-[96px] desktop:w-[136px] desktop:h-[136px] h-[96px] absolute inset-0 rounded-full flex justify-center items-center overflow-hidden'
                style={{
                  background: gradientColor,
                }}
              >
                <div className='relative overflow-hidden rounded-full  w-[90%] h-[90%]'>
                  <Image
                    src={invitationCard.main_photo_info?.imageUrl || '/assets/images/defaultImg.png'}
                    alt='invitationImg'
                    fill
                    className='object-cover'
                    priority
                  />
                </div>
              </div>
              <img
                src='/assets/images/icons/write.webp'
                alt='청첩장 수정버튼'
                className='w-[24px] h-[24px] desktop:w-[48px] desktop:h-[48px] absolute right-[-5px] top-[-5px]'
              />
              <div className=' pl-2 pr-2 pt-1 pb-1 bg-primary-300 text-white absolute bottom-[-15px] left-1/2 transform -translate-x-1/2 rounded-xl text-[14px] text-center whitespace-nowrap desktop:text-[16px]'>
                {progressPercentage}% 완성
              </div>
            </div>
          </Link>
          <div className='flex flex-col justify-between desktop:w-[420px]'>
            <div className='flex justify-between '>
              <p className='text-[16px] mb-4 desktop:mb-11 font-bold desktop:text-[20px]'>내 청첩장</p>
              <img
                src='/assets/images/icons/x-03.webp'
                alt='청첩장 삭제버튼'
                onClick={() => handleDeleteCards(invitationCard?.id)}
                className='w-[24px] h-[24px] '
              />
            </div>
            <div className='flex gap-2  items-center mb-2'>
              <div className='flex gap-1 border border-solid border-gray-200 pt-1 pb-1 pl-1.5 pr-1.5 rounded-xl '>
                <img
                  src='/assets/images/icons/link-icon.webp'
                  alt='청첩장 공유하기'
                  className='w-[18px] h-[18px] desktop:w-[24px] desktop:h-[24px]'
                />
                <button
                  onClick={handleCopyLink}
                  className='mobile:text-[12px] desktop:text-[14px] text-gray-400 white-space-nowrap'
                >
                  공유하기
                </button>
              </div>
              <div className='flex gap-1 border border-solid border-gray-200 pt-1 pb-1 pl-1.5 pr-1.5 rounded-xl'>
                <img
                  src='/assets/images/icons/download-02-selceted.webp'
                  alt='청첩장 다운로드'
                  className='w-[18px] h-[18px] desktop:w-[24px] desktop:h-[24px]'
                />
                <button
                  onClick={handlePrintAsPDF}
                  className='mobile:text-[12px] desktop:text-[14px] text-gray-400 '
                >
                  다운로드
                </button>
              </div>
            </div>
            <Link href={`/card/${invitationCard?.id}`}>
              <Button className='bg-primary300 rounded-lg w-full pt-2.5 pb-2.5 pl-7.5 pr-7.5'>
                내 청첩장 보러가기
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col justify-center items-center'>
          <Image
            src='/assets/images/card/noCard.webp'
            alt='noCardImg'
            width={64}
            height={64}
          />
          <p className='text-gray-400 font-[0.8rem]'>제작중인 청첩장이 없어요</p>
        </div>
      )}
    </div>
  );
};

export default MyInvitationCard;
