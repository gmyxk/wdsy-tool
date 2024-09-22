'use client';

import { sendMailRequest } from '@/api-request';
import { SendMail } from '@/components';

export default function SendMailPage({
  params,
}: Readonly<{
  params: { gid: string };
}>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* <div>
        <div>邮件列表</div>
        <div>暂未开放</div>
      </div> */}
      <div>
        <SendMail
          mutationFn={({ records }) =>
            sendMailRequest({
              gid: params.gid,
              mails: records,
            })
          }
        />
      </div>
    </div>
  );
}
