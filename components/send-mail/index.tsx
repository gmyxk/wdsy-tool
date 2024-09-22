'use client';

import { SendMailItem } from '@/scheme';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { SendTemplateActionRef, SendThingCommonProps } from '../send-common';
import { SendMailCustom } from './custom';
import { SendMailTemplate } from './template';

export function SendMail(props: SendThingCommonProps<SendMailItem>) {
  const actionRef = React.useRef<SendTemplateActionRef<SendMailItem>>();

  return (
    <Tabs size="sm" destroyInactiveTabPanel={false}>
      <Tab key="custom" title="自定义发放">
        <SendMailCustom
          onSaveTemplate={(data) => {
            actionRef.current?.saveToHistory(data);
          }}
          {...props}
        />
      </Tab>
      <Tab key="templates" title="模板发放">
        <SendMailTemplate actionRef={actionRef} {...props} />
      </Tab>
    </Tabs>
  );
}
