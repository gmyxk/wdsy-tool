'use client';

import { queryGidsRequest, sendMailRequest } from '@/api-request';
import { SendMail, SendMailDoc } from '@/components';
import { Progress } from '@nextui-org/react';
import pLimit from 'p-limit';
import { useState } from 'react';

export default function GlobalMailPage() {
  const [totalGidNumber, setTotalGidNumber] = useState(0);
  const [successGidNumber, setSuccessGidNumber] = useState(0);
  const [failedGidNumber, setFailedGidNumber] = useState(0);
  const [isPending, setIsPending] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <div>
        {!isPending ? (
          <div className="mb-4 flex h-8 items-center text-sm">
            发放前请确认您要发送的内容, 以免造成不必要的事故!!!
          </div>
        ) : (
          <Progress
            label={`当前发放进度 (${successGidNumber + failedGidNumber}/${totalGidNumber})`}
            size="sm"
            value={successGidNumber + failedGidNumber}
            maxValue={totalGidNumber}
            showValueLabel={true}
            className="mb-4"
          />
        )}

        <SendMail
          mutationFn={async ({ records }) => {
            const { data: gids } = await queryGidsRequest();
            setIsPending(true);
            setTotalGidNumber(gids.length);
            setSuccessGidNumber(0);
            setFailedGidNumber(0);

            const limit = pLimit(10);

            const list = gids.map((item) => {
              return limit(async () => {
                try {
                  await sendMailRequest({
                    gid: item.gid,
                    mails: records,
                  });
                  setSuccessGidNumber((prv) => prv + 1);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                  setFailedGidNumber((prv) => prv + 1);
                }
              });
            });

            await Promise.all(list);

            setIsPending(false);

            return {
              success: true,
              data: null,
            };
          }}
        />
      </div>
      <div className="xl:col-span-2">
        <SendMailDoc className="h-[calc(100vh-190px)]" />
      </div>
    </div>
  );
}
