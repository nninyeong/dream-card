import { usePathname } from 'next/navigation';

const SAMPLE_GUESTBOOK_ID = 'ce7fe66a-0734-4314-9bd3-6fd8662621db';
const useInvitationIdByPathname = () => {
  const path = usePathname();
  const invitationId = path === '/create/card' ? SAMPLE_GUESTBOOK_ID : path.split('/')[2];

  return { invitationId };
};

export default useInvitationIdByPathname as typeof useInvitationIdByPathname;
