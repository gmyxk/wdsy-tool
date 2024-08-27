'use clint';

import React from 'react';
import { HorcruxForm } from './horcrux-form';
import { HorcruxTpl, HorcruxTplActionRef } from './horcrux-tpl';

/**
 * 魂器发送
 * @returns 
 */
export const SendHorcrux = () => {
  const actionRef = React.useRef<HorcruxTplActionRef>();

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div>
        <HorcruxTpl actionRef={actionRef} />
      </div>

      <HorcruxForm
        saveHistory={(data) => {
          actionRef.current?.saveHistory(data);
        }}
      />
    </div>
  );
};
