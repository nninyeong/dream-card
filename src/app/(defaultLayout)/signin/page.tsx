'use client';
import { handleGoogleSignIn, handleKakaoSignIn } from '@/utils/supabase/signIn';
import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';
import { Notify } from 'notiflix';

const SignInPage = () => {
  const alertComingSoon = () => {
    Notify.info('준비중인 서비스입니다.');
  };

  return (
    <div className='flex flex-col items-center px-[16px] mb-[24px]'>
      <div className='flex flex-col gap-[8px] desktop:gap-[16px] items-center mt-[24px]'>
        <img
          src='/assets/images/branding/3D-logo.webp'
          alt='드림카드'
          className='w-[88px] desktop:w-[104px]'
        />
        <h3 className='font-HakgyoansimWoojuR text-primary-300 text-[20px] desktop:text-[36px] whitespace-pre-line text-center leading-[120%] tracking-[-0.04px]'>{`당신의 꿈을 담은 초대\n드림카드에서!`}</h3>
      </div>
      <section className='flex flex-col items-center gap-[16px] w-full'>
        <AuthForm mode='signin' />
        <div className='flex gap-[16px] text-[12px] desktop:text-[14px]'>
          <button onClick={alertComingSoon}>아이디 찾기</button>
          <button onClick={alertComingSoon}>비밀번호 찾기</button>
          <Link href='/signup'>회원가입</Link>
        </div>
        <h5 className='text-[20px] text-gray-600 mt-[40px]'>간편 로그인</h5>
        <div className='flex gap-[24px] text-[12px] text-center whitespace-pre leading-[12px]'>
          <button
            className='w-[48px] h-[48px] border rounded-full bg-[#FAE100] flex flex-col justify-center items-center gap-[10px]'
            onClick={handleKakaoSignIn}
          >
            <img
              src='/assets/images/icons/icon-kakao.webp'
              alt='카카오 로그인'
              className='w-[24px] h-[24px]'
            />
          </button>
          <button
            className='w-[48px] h-[48px] border rounded-full bg-white flex flex-col justify-center items-center gap-[10px]'
            onClick={handleGoogleSignIn}
          >
            <img
              src='/assets/images/icons/icon-google.webp'
              alt='구글 로그인'
              className='w-[24px] h-[24px]'
            />
          </button>
          <button
            className='w-[48px] h-[48px] border rounded-full bg-[#03CF5C] flex flex-col justify-center items-center gap-[10px]'
            onClick={alertComingSoon}
          >
            <img
              src='/assets/images/icons/icon-naver.webp'
              alt='네이버 로그인'
              className='w-[24px] h-[24px]'
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default SignInPage;
