'use client';

import { SendWuhunItem } from '@/scheme';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { SendTemplateActionRef, SendThingCommonProps } from '../send-common';
import { SendWuhunCustom } from './custom';
import { SendWuhunTemplate } from './template';

export function SendWuhun(props: SendThingCommonProps<SendWuhunItem>) {
  const actionRef = React.useRef<SendTemplateActionRef<SendWuhunItem>>();

  return (
    <Tabs size="sm" destroyInactiveTabPanel={false}>
      <Tab key="custom" title="自定义发放">
        <SendWuhunCustom
          onSaveTemplate={(data) => {
            actionRef.current?.saveToHistory(data);
          }}
          {...props}
        />
      </Tab>
      <Tab key="templates" title="模板发放">
        <SendWuhunTemplate actionRef={actionRef} {...props} />
      </Tab>
    </Tabs>
  );
}
