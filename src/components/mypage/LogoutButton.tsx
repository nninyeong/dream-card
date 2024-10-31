'use client';
import useSignOut from '@/hooks/auth/useSignOut';

const LogoutButton = () => {
  const { handleSignOut } = useSignOut();
  return (
    <button
      className='w-full bg-primary-300  font-bold p-4 mt-4 mb-12 rounded text-center cursor-pointer'
      onClick={handleSignOut}
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
