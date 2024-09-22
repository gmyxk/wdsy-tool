'use client';

import { sendHorcruxRequest } from '@/api-request';
import { SendHorcrux } from '@/components';
import { useQueryClient } from '@tanstack/react-query';

export default function SendEquipmentPage({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  const queryClient = useQueryClient();

  return (
    <SendHorcrux
      mutationFn={({ horcruxs }) =>
        sendHorcruxRequest({
          gid: params.gid,
          horcruxs,
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
