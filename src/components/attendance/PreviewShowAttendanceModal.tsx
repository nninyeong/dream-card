'use client';

import { useAttendanceContext } from '@/context/AttendanceContext';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';
import AttendanceModal from './AttendanceModal';

const PreviewShowAttendanceModal = () => {
  const { invitationId } = useInvitationIdByPathname();
  const { showModal, toggleModal } = useAttendanceContext();

  return (
    <>
      {showModal && (
        <AttendanceModal
          invitationId={invitationId}
          onClick={toggleModal}
        />
      )}
    </>
  );
};

export default PreviewShowAttendanceModal;