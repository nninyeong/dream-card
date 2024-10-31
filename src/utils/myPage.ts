import { InvitationFormType } from '@/types/invitationFormType.type';
import { getUserInfo } from './server-action';
import { supabase } from './supabase/createClient';

export const getInvitationCard = async (): Promise<InvitationFormType[] | null> => {
  const user = await getUserInfo();
  const userId = user?.user.id;
  const { data, error } = await supabase.from('invitation').select('*').eq('user_id', userId);

  if (error) {
    console.error('청첩장데이터를 불러오지못했습니다.', error);
    return null;
  }

  return data as InvitationFormType[];
};

export const patchPrivateInvitation = async (isPrivate: boolean) => {
  const user = await getUserInfo();
  const userId = user?.user.id;
  const { data, error } = await supabase.from('invitation').update({ isPrivate: isPrivate }).eq('user_id', userId);
  if (error) {
    console.error('초대장 상태 업데이트 실패:', error);
    return null;
  }
  return data;
};
