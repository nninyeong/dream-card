'use client';

import { useAuthUserQuery } from '@/hooks/queries/review/useGetReview';
import { useGetReviewCarouselQuery } from '@/hooks/queries/review/useGetReviewCarousel';
import { formatDate } from '@/utils/formatDate';
import { maskIdLastFour } from '@/utils/maskIdLastFour';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

const MAX_CONTENT_LENGTH = 60;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: reviewsData = [], isLoading } = useGetReviewCarouselQuery();
  const { data: users } = useAuthUserQuery();

  const extendedReviewArr = useMemo(() => {
    return isLoading ? [] : [...reviewsData, ...reviewsData, ...reviewsData, reviewsData[0]];
  }, [isLoading, reviewsData]);

  useEffect(() => {
    if (extendedReviewArr.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % extendedReviewArr.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [extendedReviewArr.length]);

  useEffect(() => {
    if (extendedReviewArr.length > 0 && currentIndex === extendedReviewArr.length - 17) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, extendedReviewArr.length]);

  const getCarouselStyle = () => {
    const isDesktop = window.innerWidth >= 1440;
    return {
      transform: `translateX(${-currentIndex * (isDesktop ? 383 + 16 : 216 + 16)}px)`,
      transition: currentIndex === 0 ? 'none' : 'transform 0.5s ease-in-out',
    };
  };

  const sliceContent = (content: string) => {
    return content.slice(0, MAX_CONTENT_LENGTH) + (content.length > MAX_CONTENT_LENGTH ? '...' : '');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='overflow-hidden w-full py-[10px]'>
      <div
        className='flex justify-center'
        style={getCarouselStyle()}
      >
        {extendedReviewArr.map((review, index) => {
          const imgUrls = review.image_url || [];
          const user = users?.users.find((user) => user.id === review.user_id);
          const avatarUrl = user?.user_metadata?.avatar_url || '/assets/images/defaultImg.png';
          return (
            <div
              key={`${review.id}-${index}`}
              className='mx-[8px]'
            >
              <div className='relative desktop:w-[383px] desktop:h-[340px] mobile:w-[216px] mobile:h-[192px] rounded-t-2xl overflow-hidden shadow-md'>
                {imgUrls.length > 0 && (
                  <Image
                    src={imgUrls[0]}
                    alt='리뷰 이미지'
                    layout='fill'
                    objectFit='cover'
                    priority
                  />
                )}
                <div className='absolute inset-0 bg-black opacity-50' />
              </div>
              <div className='desktop:w-[383px] desktop:h-[241px] mobile:w-[216px] mobile:h-[136px] rounded-b-2xl desktop:p-[24px] mobile:p-[16px] desktop:text-[24px] mobile:text-[12px] shadow-md'>
                <div className='flex items-center desktop:gap-[16px] mobile:gap-[6px] desktop:mb-[24px] mobile:mb-[16px]'>
                  <div className='relative desktop:w-[42px] desktop:h-[42px] mobile:w-[16px] mobile:h-[16px] rounded-full overflow-hidden'>
                    <Image
                      src={avatarUrl}
                      alt='profile'
                      layout='fill'
                      objectFit='cover'
                      priority
                    />
                  </div>
                  <p className='text-gray-500'>
                    {maskIdLastFour(user?.user_metadata?.email) ?? '작성자'} | {formatDate(review.created_at)}
                  </p>
                </div>
                <p className='desktop:text-[20px] mobile:text-[12px]'>{sliceContent(review.content)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
