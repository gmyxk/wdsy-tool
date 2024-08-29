import React from 'react';
import { EquipmentForm } from './equipment-form';
import { EquipmentTpl, EquipmentTplActionRef } from './equipment-tpl';

/**
 * 发送装备
 * @returns
 */
export const SendEquipment = () => {
  const actionRef = React.useRef<EquipmentTplActionRef>();

  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div>
        <EquipmentTpl actionRef={actionRef} />
      </div>

      <EquipmentForm
        saveHistory={(data) => {
          actionRef.current?.saveHistory(data);
        }}
      />
    </div>
  );
};
