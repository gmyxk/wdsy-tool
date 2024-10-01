'use client';

import { sendWuhunRequest } from '@/api-request';
import { SendWuhun } from '@/components';
import { useQueryClient } from '@tanstack/react-query';
import { WuhunContentEditor } from './wuhun-editor';

export default function TaiyinHome({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  const queryClient = useQueryClient();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div>
        <SendWuhun
          mutationFn={({ records }) =>
            sendWuhunRequest({
              gid: params.gid,
              wuhuns: records,
            })
          }
          onSendSuccess={() => {
            queryClient.invalidateQueries({
              queryKey: ['wuhun-info', params.gid],
            });
          }}
        />
      </div>
      <div className="xl:col-span-2">
        <WuhunContentEditor gid={params.gid} />
      </div>
    </div>
  );
}
