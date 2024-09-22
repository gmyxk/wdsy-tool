'use client';

import { Tab, Tabs } from '@nextui-org/react';
import { CustomVerify } from './custom-verify';
import { MailVerify } from './mail-verify';
import { UserCarryVerify } from './user-carry-verify';
import { UserDataVerify } from './user-data-verify';

/**
 * 生成 checksum
 */
export default function ChecksumPage() {
  return (
    <Tabs>
      <Tab title="user_carry" key="user_carry">
        <UserCarryVerify />
      </Tab>

      <Tab title="user_data" key="user_data">
        <UserDataVerify />
      </Tab>

      <Tab title="mail" key="mail">
        <MailVerify />
      </Tab>

      <Tab title="自定义" key="custom">
        <CustomVerify />
      </Tab>
    </Tabs>
  );
}
