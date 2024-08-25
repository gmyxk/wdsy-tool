import React from 'react';
import { HorcruxForm } from './horcrux-form';
import { HorcruxTpl, HorcruxTplActionRef } from './horcrux-tpl';

interface HorcruSendProps {
  gids: string[];
}

export const HorcruSend = (props: HorcruSendProps) => {
  const actionRef = React.useRef<HorcruxTplActionRef>();

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div>
        <HorcruxTpl gids={props.gids} actionRef={actionRef} />
      </div>

      <HorcruxForm
        gids={props.gids}
        saveHistory={(data) => {
          actionRef.current?.saveHistory(data);
        }}
      />
    </div>
  );
};
