'use client';

import { SendHorcruxItem } from '@/scheme';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { SendTemplateActionRef, SendThingCommonProps } from '../send-common';
import { SendHorcruxCustom } from './horcrux-form';
import { SendHorcruxTemplate } from './horcrux-tpl';

export function SendHorcrux(props: SendThingCommonProps<SendHorcruxItem>) {
  const actionRef = React.useRef<SendTemplateActionRef<SendHorcruxItem>>();

  return (
    <Tabs size="sm" destroyInactiveTabPanel={false}>
      <Tab key="custom" title="自定义发放">
        <SendHorcruxCustom
          onSaveTemplate={(data) => {
            actionRef.current?.saveToHistory(data);
          }}
          {...props}
        />
      </Tab>
      <Tab key="templates" title="模板发放">
        <SendHorcruxTemplate actionRef={actionRef} {...props} />
      </Tab>
    </Tabs>
  );
}
