'use client';

import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { SendHorcruxCommonProps } from './common';
import { SendHorcruxCustom } from './horcrux-form';
import { HorcruxTplActionRef, SendHorcruxTemplate } from './horcrux-tpl';

export function SendHorcrux(props: SendHorcruxCommonProps) {
  const actionRef = React.useRef<HorcruxTplActionRef>();

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
