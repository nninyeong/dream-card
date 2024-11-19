'use client';

import { useReviewImage } from '@/hooks/queries/review/useGetReview';
import { Review } from '@/types/review.types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ReviewImageLoading } from '../loading/ReviewLoading';
import useMediaQuery from '@/hooks/review/useMediaQuery';
import ImagePage from '@/app/(defaultLayout)/review/images/page';

const ReviewImage = () => {
  const { data: allReviews, isLoading, error } = useReviewImage();
  const router = useRouter();
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (isImageModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isImageModalOpen]);

  useEffect(() => {
    const updateDisplayedReviews = () => {
      const width = window.innerWidth;
      let reviewsToShow;

      if (width >= 1440) {
        reviewsToShow = 8;
      } else {
        reviewsToShow = 4;
      }

      setDisplayedReviews(allReviews?.slice(0, reviewsToShow) || []);
    };

    updateDisplayedReviews();

    window.addEventListener('resize', updateDisplayedReviews);

    return () => {
      window.removeEventListener('resize', updateDisplayedReviews);
    };
  }, [allReviews]);

  if (isLoading) {
    return <ReviewImageLoading />;
  }

  if (error) {
    throw new Error();
  }

  const handleOpenNewPage = () => {
    if (isDesktop) {
      setIsImageModalOpen(true);
    } else {
      router.push('/review/images');
    }
  };

  const closeImageModal = () => setIsImageModalOpen(false);

  return (
    <div className='w-full grid grid-cols-4  desktop:grid-cols-8  desktop:gap-[24px] desktop:mt-[54px]  pb-4  desktop:pb-20 border border-solid border-gray-200 border-t-0 border-l-0 border-r-0 '>
      {displayedReviews?.map((review, reviewIndex) => {
        const firstImage = review.image_url?.[0];
        const isLastImage = reviewIndex === displayedReviews.length - 1;

        return (
          <div
            key={reviewIndex}
            className='w-full  flex justify-center relative  '
          >
            <div className='desktop:w-[121px] desktop:h-[121px] relative w-[76px] h-[76px] border border-gray-50 rounded-[12px] '>
              {firstImage && (
                <Image
                  src={firstImage}
                  alt={`${reviewIndex + 1}`}
                  fill
                  className='rounded-[12px] object-cover '
                  priority
                />
              )}
              {isLastImage && (
                <button
                  onClick={handleOpenNewPage}
                  className='absolute inset-0  z-20  bg-black opacity-60 text-white rounded-[12px] text-[14px]'
                >
                  더보기
                </button>
              )}
            </div>
          </div>
        );
      })}
      {isImageModalOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'
          onClick={closeImageModal}
        >
          <div
            className='relative bg-white p-4 rounded-[24px] w-[1136px] h-[533px] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src='assets/images/icons/x-03.webp'
              alt='닫기버튼'
              onClick={closeImageModal}
              className='absolute top-4 right-4 text-black w-[24px] h-[24px] '
            />
            <ImagePage />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewImage;
