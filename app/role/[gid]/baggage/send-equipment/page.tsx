'use client';

import { sendEquipmentRequest } from '@/api-request';
import { SendEquipment } from '@/components';
import { useQueryClient } from '@tanstack/react-query';

export default function SendEquipmentPage({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  const queryClient = useQueryClient();

  return (
    <SendEquipment
      mutationFn={({ records }) =>
        sendEquipmentRequest({
          gid: params.gid,
          equips: records,
        })
      }
      onSendSuccess={() => {
        queryClient.invalidateQueries({
          queryKey: ['baggageInfo', params.gid],
        });
      }}
    />
  );
}
