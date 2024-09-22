'use client';

import { SendEquipmentItem } from '@/scheme';
import { Tab, Tabs } from '@nextui-org/react';
import React from 'react';
import { SendTemplateActionRef, SendThingCommonProps } from '../send-common';
import { SendEquipmentCustom } from './equipment-form';
import { SendEquipmentTemplate } from './equipment-tpl';

export function SendEquipment(props: SendThingCommonProps<SendEquipmentItem>) {
  const actionRef = React.useRef<SendTemplateActionRef<SendEquipmentItem>>();

  return (
    <Tabs size="sm" destroyInactiveTabPanel={false}>
      <Tab key="custom" title="自定义发放">
        <SendEquipmentCustom
          onSaveTemplate={(data) => {
            actionRef.current?.saveToHistory(data);
          }}
          {...props}
        />
      </Tab>
      <Tab key="templates" title="模板发放">
        <SendEquipmentTemplate actionRef={actionRef} {...props} />
      </Tab>
    </Tabs>
  );
}
