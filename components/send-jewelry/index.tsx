'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { SendJewelryCommonProps } from './common';
import { SendJewelryCustom } from './custom';
import { JewelryTplActionRef, SendJewelryTemplate } from './template';

export function SendJewelry(props: SendJewelryCommonProps) {
  const actionRef = React.useRef<JewelryTplActionRef>();

  return (
    <Tabs size="sm" destroyInactiveTabPanel={false}>
      <Tab key="custom" title="自定义发放">
        <SendJewelryCustom
          onSaveTemplate={(data) => {
            actionRef.current?.saveToHistory(data);
          }}
          {...props}
        />
      </Tab>
      <Tab key="templates" title="模板发放">
        <SendJewelryTemplate actionRef={actionRef} {...props} />
      </Tab>
    </Tabs>
  );
}
