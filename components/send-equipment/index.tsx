import { EquipmentForm } from './equipment-form';

/**
 * 发送装备
 * @returns
 */
export const SendEquipment = () => {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div>{/* <HorcruxTpl actionRef={actionRef} /> */}</div>

      <EquipmentForm
      // saveHistory={(data) => {
      //   actionRef.current?.saveHistory(data);
      // }}
      />
    </div>
  );
};
