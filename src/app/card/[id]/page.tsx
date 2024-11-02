import { notFound } from 'next/navigation';
import { supabase } from '@/utils/supabase/createClient';
import { convertToCamelCase } from '@/utils/convert/invitaitonTypeConvert';
import { COMPONENT_TYPES } from '@/constants/componentTypes';
import { convertOrderToComponent } from '@/utils/convert/convertOrderToComponent';
import { Fragment } from 'react';

export const generateStaticParams = async () => {
  const { data } = await supabase.from('invitation').select('id');
  return (
    data?.map((invitation) => ({
      id: invitation.id,
    })) || []
  );
};

const fetchInvitationData = async (id: string) => {
  const { data, error } = await supabase.from('invitation').select('*').eq('id', id).single();

  if (error || !data) notFound();

  return data;
};

const CardPage = async ({ params }: { params: { id: string } }) => {
  const invitation = await fetchInvitationData(params.id);
  const { isPrivate, renderOrder, ...invitationData } = convertToCamelCase(invitation);

  return isPrivate ? (
    <div>아직 공개되지 않은 청첩장입니다.</div>
  ) : (
    <div>
      {renderOrder
        .sort((a, b) => a.order - b.order)
        .map(({ typeOnSharedCard }, index) => (
          <Fragment key={index}>{convertOrderToComponent(typeOnSharedCard, invitationData)}</Fragment>
        ))}
    </div>
  );
};

export default CardPage;
