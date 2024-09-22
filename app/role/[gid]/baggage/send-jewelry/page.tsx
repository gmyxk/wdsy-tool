'use client';

import { sendJewelryRequest } from '@/api-request';
import { SendJewelry } from '@/components';
import { useQueryClient } from '@tanstack/react-query';

export default function SendJewelryPage({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  const queryClient = useQueryClient();

  return (
    <SendJewelry
      mutationFn={({ jewelrys }) =>
        sendJewelryRequest({
          gid: params.gid,
          jewelrys,
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
