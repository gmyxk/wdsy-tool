'use client';

import {
  ClearPackage,
  EditBaggage,
  EditConsumptionPoints,
  RoleList,
  SendEquipment,
  SendHorcrux,
  SendJewelry,
  SendMail,
} from '@/components';
import { useWindowSize } from '@/hook/useWindowSize';
import { Tab, Tabs } from '@nextui-org/react';

export default function Home() {
  const size = useWindowSize();

  const isMobile = size?.width ? size?.width < 768 : false;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <RoleList className='h-[calc(100vh-88px)] md:sticky md:top-[72px]' />
      <div className="col-span-1 xl:col-span-2">
        <Tabs
          destroyInactiveTabPanel={false}
          classNames={{
            base: 'max-w-full',
          }}
        >
          <Tab title="邮件发送" key="mail">
            <SendMail />
          </Tab>
          <Tab title="首饰发送" key="jewelry">
            <SendJewelry />
          </Tab>
          <Tab title="魂器发送" key="soul-weapon">
            <SendHorcrux />
          </Tab>
          <Tab title="装备发送" key="equipment">
            <SendEquipment />
          </Tab>
          <Tab title="查看包裹" key="baggage">
            <EditBaggage />
          </Tab>
          <Tab title="其他功能" key="other">
            <Tabs isVertical={!isMobile}>
              <Tab title="清理包裹" key="clear-pak">
                <ClearPackage />
              </Tab>
              <Tab title="消费积分修改" key="EditConsumptionPoints">
                <EditConsumptionPoints />
              </Tab>
            </Tabs>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
